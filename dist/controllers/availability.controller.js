"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
exports.getById = getById;
exports.create = create;
exports.update = update;
exports.remove = remove;
const availability_service_1 = require("../services/availability.service");
async function getAll(req, res) {
    try {
        const stylistId = req.query.stylistId ? Number(req.query.stylistId) : undefined;
        const availableOnly = req.query.available === 'true';
        return res.json({ data: await (0, availability_service_1.findAllAvailabilities)(stylistId, availableOnly) });
    }
    catch {
        return res.status(500).json({ error: 'Failed to fetch availability' });
    }
}
async function getById(req, res) {
    try {
        const slot = await (0, availability_service_1.findAvailabilityById)(Number(req.params.id));
        if (!slot)
            return res.status(404).json({ error: 'Availability slot not found' });
        return res.json({ data: slot });
    }
    catch {
        return res.status(500).json({ error: 'Failed to fetch slot' });
    }
}
async function create(req, res) {
    try {
        const { stylistId, date, startTime, endTime } = req.body;
        if (!stylistId || !date || !startTime || !endTime) {
            return res.status(400).json({ error: 'stylistId, date, startTime, and endTime are required' });
        }
        return res.status(201).json({ data: await (0, availability_service_1.createAvailability)(stylistId, date, startTime, endTime) });
    }
    catch {
        return res.status(500).json({ error: 'Failed to create availability slot' });
    }
}
async function update(req, res) {
    try {
        return res.json({ data: await (0, availability_service_1.updateAvailability)(Number(req.params.id), req.body) });
    }
    catch (e) {
        if (e.code === 'P2025')
            return res.status(404).json({ error: 'Slot not found' });
        return res.status(500).json({ error: 'Failed to update slot' });
    }
}
async function remove(req, res) {
    try {
        await (0, availability_service_1.deleteAvailability)(Number(req.params.id));
        return res.json({ data: { message: 'Availability slot deleted' } });
    }
    catch (e) {
        if (e.code === 'P2025')
            return res.status(404).json({ error: 'Slot not found' });
        return res.status(500).json({ error: 'Failed to delete slot' });
    }
}
//# sourceMappingURL=availability.controller.js.map