"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
exports.getById = getById;
exports.create = create;
exports.update = update;
exports.remove = remove;
const payment_service_1 = require("../services/payment.service");
async function getAll(_req, res) {
    try {
        return res.json({ data: await (0, payment_service_1.findAllPayments)() });
    }
    catch {
        return res.status(500).json({ error: 'Failed to fetch payments' });
    }
}
async function getById(req, res) {
    try {
        const payment = await (0, payment_service_1.findPaymentById)(Number(req.params.id));
        if (!payment)
            return res.status(404).json({ error: 'Payment not found' });
        return res.json({ data: payment });
    }
    catch {
        return res.status(500).json({ error: 'Failed to fetch payment' });
    }
}
async function create(req, res) {
    try {
        const { appointmentId, clientId, amount } = req.body;
        if (!appointmentId || !clientId || amount === undefined) {
            return res.status(400).json({ error: 'appointmentId, clientId, and amount are required' });
        }
        return res.status(201).json({ data: await (0, payment_service_1.createPayment)(req.body) });
    }
    catch (e) {
        if (e.code === 'P2002')
            return res.status(409).json({ error: 'Payment already exists for this appointment' });
        return res.status(500).json({ error: 'Failed to create payment' });
    }
}
async function update(req, res) {
    try {
        return res.json({ data: await (0, payment_service_1.updatePayment)(Number(req.params.id), req.body) });
    }
    catch (e) {
        if (e.code === 'P2025')
            return res.status(404).json({ error: 'Payment not found' });
        return res.status(500).json({ error: 'Failed to update payment' });
    }
}
async function remove(req, res) {
    try {
        await (0, payment_service_1.deletePayment)(Number(req.params.id));
        return res.json({ data: { message: 'Payment deleted' } });
    }
    catch (e) {
        if (e.code === 'P2025')
            return res.status(404).json({ error: 'Payment not found' });
        return res.status(500).json({ error: 'Failed to delete payment' });
    }
}
//# sourceMappingURL=payment.controller.js.map