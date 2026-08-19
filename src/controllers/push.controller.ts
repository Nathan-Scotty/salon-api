import { Request, Response } from 'express';
import webpush from 'web-push';
import prisma from '../lib/prisma';

webpush.setVapidDetails(
  process.env.VAPID_EMAIL || 'mailto:davilasbarack@gmail.com',
  process.env.VAPID_PUBLIC_KEY || '',
  process.env.VAPID_PRIVATE_KEY || ''
);

export async function subscribe(req: Request, res: Response) {
  try {
    const { endpoint, keys } = req.body;
    if (!endpoint || !keys?.p256dh || !keys?.auth) {
      return res.status(400).json({ error: 'Invalid subscription' });
    }

    await prisma.pushSubscription.upsert({
      where: { endpoint },
      update: { p256dh: keys.p256dh, auth: keys.auth },
      create: { endpoint, p256dh: keys.p256dh, auth: keys.auth },
    });

    return res.status(201).json({ message: 'Subscribed' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Failed to subscribe' });
  }
}

export async function unsubscribe(req: Request, res: Response) {
  try {
    const { endpoint } = req.body;
    await prisma.pushSubscription.deleteMany({ where: { endpoint } });
    return res.json({ message: 'Unsubscribed' });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to unsubscribe' });
  }
}

export async function notify(req: Request, res: Response) {
  try {
    const { title, body, url } = req.body;
    const subs = await prisma.pushSubscription.findMany();

    if (subs.length === 0) {
      return res.status(200).json({ message: 'No subscribers' });
    }

    const payload = JSON.stringify({ title, body, url: url || '/admin' });

    const results = await Promise.allSettled(
      subs.map(sub =>
        webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: { p256dh: sub.p256dh, auth: sub.auth },
          },
          payload
        ).catch(async (err) => {
          // Remove invalid subscriptions (410 Gone)
          if (err.statusCode === 410) {
            await prisma.pushSubscription.deleteMany({ where: { endpoint: sub.endpoint } });
          }
          throw err;
        })
      )
    );

    const sent   = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    return res.status(200).json({ sent, failed });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Failed to send notifications' });
  }
}
