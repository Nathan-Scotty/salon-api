"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
exports.getById = getById;
exports.create = create;
exports.update = update;
exports.remove = remove;
const stylist_service_1 = require("../services/stylist.service");
async function getAll(_req, res) {
    try {
        return res.json({ data: await (0, stylist_service_1.findAllStylists)() });
    }
    catch {
        return res.status(500).json({ error: 'Failed to fetch stylists' });
    }
}
async function getById(req, res) {
    try {
        const stylist = await (0, stylist_service_1.findStylistById)(Number(req.params.id));
        if (!stylist)
            return res.status(404).json({ error: 'Stylist not found' });
        return res.json({ data: stylist });
    }
    catch {
        return res.status(500).json({ error: 'Failed to fetch stylist' });
    }
}
async function create(req, res) {
    try {
        const { userId, bio, specialties } = req.body;
        if (!userId)
            return res.status(400).json({ error: 'userId is required' });
        return res.status(201).json({ data: await (0, stylist_service_1.createStylist)(userId, bio, specialties) });
    }
    catch (e) {
        if (e.code === 'P2002')
            return res.status(409).json({ error: 'Stylist profile already exists for this user' });
        return res.status(500).json({ error: 'Failed to create stylist' });
    }
}
async function update(req, res) {
    try {
        return res.json({ data: await (0, stylist_service_1.updateStylist)(Number(req.params.id), req.body) });
    }
    catch (e) {
        if (e.code === 'P2025')
            return res.status(404).json({ error: 'Stylist not found' });
        return res.status(500).json({ error: 'Failed to update stylist' });
    }
}
async function remove(req, res) {
    try {
        await (0, stylist_service_1.deleteStylist)(Number(req.params.id));
        return res.json({ data: { message: 'Stylist deleted' } });
    }
    catch (e) {
        if (e.code === 'P2025')
            return res.status(404).json({ error: 'Stylist not found' });
        return res.status(500).json({ error: 'Failed to delete stylist' });
    }
}
//# sourceMappingURL=stylist.controller.js.map