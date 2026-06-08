"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByPost = getByPost;
exports.getById = getById;
exports.create = create;
exports.update = update;
exports.remove = remove;
const media_service_1 = require("../services/media.service");
async function getByPost(req, res) {
    try {
        const postId = Number(req.query.postId);
        if (!postId)
            return res.status(400).json({ error: 'postId query param is required' });
        return res.json({ data: await (0, media_service_1.findMediaByPost)(postId) });
    }
    catch {
        return res.status(500).json({ error: 'Failed to fetch media' });
    }
}
async function getById(req, res) {
    try {
        const media = await (0, media_service_1.findMediaById)(Number(req.params.id));
        if (!media)
            return res.status(404).json({ error: 'Media not found' });
        return res.json({ data: media });
    }
    catch {
        return res.status(500).json({ error: 'Failed to fetch media' });
    }
}
async function create(req, res) {
    try {
        const { postId, url } = req.body;
        if (!postId || !url)
            return res.status(400).json({ error: 'postId and url are required' });
        return res.status(201).json({ data: await (0, media_service_1.createMedia)(req.body) });
    }
    catch {
        return res.status(500).json({ error: 'Failed to create media' });
    }
}
async function update(req, res) {
    try {
        return res.json({ data: await (0, media_service_1.updateMedia)(Number(req.params.id), req.body) });
    }
    catch (e) {
        if (e.code === 'P2025')
            return res.status(404).json({ error: 'Media not found' });
        return res.status(500).json({ error: 'Failed to update media' });
    }
}
async function remove(req, res) {
    try {
        await (0, media_service_1.deleteMedia)(Number(req.params.id));
        return res.json({ data: { message: 'Media deleted' } });
    }
    catch (e) {
        if (e.code === 'P2025')
            return res.status(404).json({ error: 'Media not found' });
        return res.status(500).json({ error: 'Failed to delete media' });
    }
}
//# sourceMappingURL=media.controller.js.map