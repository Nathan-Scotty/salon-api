"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
exports.getById = getById;
exports.create = create;
exports.update = update;
exports.remove = remove;
const appointment_service_1 = require("../services/appointment.service");
async function getAll(_req, res) {
    try {
        return res.json({ data: await (0, appointment_service_1.findAllAppointments)() });
    }
    catch {
        return res.status(500).json({ error: 'Failed to fetch appointments' });
    }
}
async function getById(req, res) {
    try {
        const appointment = await (0, appointment_service_1.findAppointmentById)(Number(req.params.id));
        if (!appointment)
            return res.status(404).json({ error: 'Appointment not found' });
        return res.json({ data: appointment });
    }
    catch {
        return res.status(500).json({ error: 'Failed to fetch appointment' });
    }
}
async function create(req, res) {
    try {
        const { clientId, stylistId, scheduledAt } = req.body;
        if (!clientId || !stylistId || !scheduledAt) {
            return res.status(400).json({ error: 'clientId, stylistId, and scheduledAt are required' });
        }
        return res.status(201).json({ data: await (0, appointment_service_1.createAppointment)(req.body) });
    }
    catch {
        return res.status(500).json({ error: 'Failed to create appointment' });
    }
}
async function update(req, res) {
    try {
        return res.json({ data: await (0, appointment_service_1.updateAppointment)(Number(req.params.id), req.body) });
    }
    catch (e) {
        if (e.code === 'P2025')
            return res.status(404).json({ error: 'Appointment not found' });
        return res.status(500).json({ error: 'Failed to update appointment' });
    }
}
async function remove(req, res) {
    try {
        await (0, appointment_service_1.deleteAppointment)(Number(req.params.id));
        return res.json({ data: { message: 'Appointment deleted' } });
    }
    catch (e) {
        if (e.code === 'P2025')
            return res.status(404).json({ error: 'Appointment not found' });
        return res.status(500).json({ error: 'Failed to delete appointment' });
    }
}
//# sourceMappingURL=appointment.controller.js.map