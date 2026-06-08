"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByAppointment = getByAppointment;
exports.add = add;
exports.updatePrice = updatePrice;
exports.remove = remove;
const appointmentService_service_1 = require("../services/appointmentService.service");
async function getByAppointment(req, res) {
    try {
        const appointmentId = Number(req.query.appointmentId);
        if (!appointmentId)
            return res.status(400).json({ error: 'appointmentId query param is required' });
        return res.json({ data: await (0, appointmentService_service_1.findServicesByAppointment)(appointmentId) });
    }
    catch {
        return res.status(500).json({ error: 'Failed to fetch appointment services' });
    }
}
async function add(req, res) {
    try {
        const { appointmentId, serviceId, priceAtTime } = req.body;
        if (!appointmentId || !serviceId || priceAtTime === undefined) {
            return res.status(400).json({ error: 'appointmentId, serviceId, and priceAtTime are required' });
        }
        return res.status(201).json({ data: await (0, appointmentService_service_1.addServiceToAppointment)(appointmentId, serviceId, priceAtTime) });
    }
    catch (e) {
        if (e.code === 'P2002')
            return res.status(409).json({ error: 'Service already added to this appointment' });
        return res.status(500).json({ error: 'Failed to add service' });
    }
}
async function updatePrice(req, res) {
    try {
        const { appointmentId, serviceId, priceAtTime } = req.body;
        if (!appointmentId || !serviceId || priceAtTime === undefined) {
            return res.status(400).json({ error: 'appointmentId, serviceId, and priceAtTime are required' });
        }
        return res.json({ data: await (0, appointmentService_service_1.updateAppointmentServicePrice)(appointmentId, serviceId, priceAtTime) });
    }
    catch {
        return res.status(500).json({ error: 'Failed to update price' });
    }
}
async function remove(req, res) {
    try {
        const { appointmentId, serviceId } = req.body;
        if (!appointmentId || !serviceId) {
            return res.status(400).json({ error: 'appointmentId and serviceId are required' });
        }
        await (0, appointmentService_service_1.removeServiceFromAppointment)(appointmentId, serviceId);
        return res.json({ data: { message: 'Service removed from appointment' } });
    }
    catch {
        return res.status(500).json({ error: 'Failed to remove service' });
    }
}
//# sourceMappingURL=appointmentService.controller.js.map