"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
exports.getById = getById;
exports.create = create;
exports.update = update;
exports.remove = remove;
const client_service_1 = require("../services/client.service");
async function getAll(_req, res) {
    try {
        return res.json({ data: await (0, client_service_1.findAllClients)() });
    }
    catch {
        return res.status(500).json({ error: 'Failed to fetch clients' });
    }
}
async function getById(req, res) {
    try {
        const client = await (0, client_service_1.findClientById)(Number(req.params.id));
        if (!client)
            return res.status(404).json({ error: 'Client not found' });
        return res.json({ data: client });
    }
    catch {
        return res.status(500).json({ error: 'Failed to fetch client' });
    }
}
async function create(req, res) {
    try {
        const { userId, notes } = req.body;
        if (!userId)
            return res.status(400).json({ error: 'userId is required' });
        return res.status(201).json({ data: await (0, client_service_1.createClient)(userId, notes) });
    }
    catch (e) {
        if (e.code === 'P2002')
            return res.status(409).json({ error: 'Client profile already exists for this user' });
        return res.status(500).json({ error: 'Failed to create client' });
    }
}
async function update(req, res) {
    try {
        return res.json({ data: await (0, client_service_1.updateClient)(Number(req.params.id), req.body) });
    }
    catch (e) {
        if (e.code === 'P2025')
            return res.status(404).json({ error: 'Client not found' });
        return res.status(500).json({ error: 'Failed to update client' });
    }
}
async function remove(req, res) {
    try {
        await (0, client_service_1.deleteClient)(Number(req.params.id));
        return res.json({ data: { message: 'Client deleted' } });
    }
    catch (e) {
        if (e.code === 'P2025')
            return res.status(404).json({ error: 'Client not found' });
        return res.status(500).json({ error: 'Failed to delete client' });
    }
}
//# sourceMappingURL=client.controller.js.map