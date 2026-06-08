"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
exports.getById = getById;
exports.create = create;
exports.update = update;
exports.remove = remove;
const service_service_1 = require("../services/service.service");
async function getAll(req, res) {
    try {
        const activeOnly = req.query.active === 'true';
        return res.json({ data: await (0, service_service_1.findAllServices)(activeOnly) });
    }
    catch {
        return res.status(500).json({ error: 'Failed to fetch services' });
    }
}
async function getById(req, res) {
    try {
        const service = await (0, service_service_1.findServiceById)(Number(req.params.id));
        if (!service)
            return res.status(404).json({ error: 'Service not found' });
        return res.json({ data: service });
    }
    catch {
        return res.status(500).json({ error: 'Failed to fetch service' });
    }
}
async function create(req, res) {
    try {
        const { name, price, durationMin } = req.body;
        if (!name || price === undefined || !durationMin) {
            return res.status(400).json({ error: 'name, price, and durationMin are required' });
        }
        return res.status(201).json({ data: await (0, service_service_1.createService)(req.body) });
    }
    catch {
        return res.status(500).json({ error: 'Failed to create service' });
    }
}
async function update(req, res) {
    try {
        return res.json({ data: await (0, service_service_1.updateService)(Number(req.params.id), req.body) });
    }
    catch (e) {
        if (e.code === 'P2025')
            return res.status(404).json({ error: 'Service not found' });
        return res.status(500).json({ error: 'Failed to update service' });
    }
}
async function remove(req, res) {
    try {
        await (0, service_service_1.deleteService)(Number(req.params.id));
        return res.json({ data: { message: 'Service deleted' } });
    }
    catch (e) {
        if (e.code === 'P2025')
            return res.status(404).json({ error: 'Service not found' });
        return res.status(500).json({ error: 'Failed to delete service' });
    }
}
//# sourceMappingURL=service.controller.js.map