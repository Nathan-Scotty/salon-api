"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllAppointments = findAllAppointments;
exports.findAppointmentById = findAppointmentById;
exports.createAppointment = createAppointment;
exports.updateAppointment = updateAppointment;
exports.deleteAppointment = deleteAppointment;
const prisma_1 = __importDefault(require("../lib/prisma"));
const include = {
    client: { include: { user: { select: { name: true, email: true, phone: true } } } },
    stylist: { include: { user: { select: { name: true } } } },
    services: { include: { service: true } },
    payment: true,
};
async function findAllAppointments() {
    return prisma_1.default.appointment.findMany({ orderBy: { scheduledAt: 'asc' }, include });
}
async function findAppointmentById(id) {
    return prisma_1.default.appointment.findUnique({ where: { id }, include });
}
async function createAppointment(data) {
    const appointment = await prisma_1.default.appointment.create({
        data: {
            clientId: data.clientId,
            stylistId: data.stylistId,
            availabilityId: data.availabilityId,
            scheduledAt: new Date(data.scheduledAt),
            notes: data.notes,
        },
    });
    if (data.availabilityId) {
        await prisma_1.default.availability.update({ where: { id: data.availabilityId }, data: { isBooked: true } });
    }
    return appointment;
}
async function updateAppointment(id, data) {
    return prisma_1.default.appointment.update({
        where: { id },
        data: {
            ...(data.scheduledAt ? { scheduledAt: new Date(data.scheduledAt) } : {}),
            ...(data.status ? { status: data.status } : {}),
            ...(data.notes !== undefined ? { notes: data.notes } : {}),
        },
    });
}
async function deleteAppointment(id) {
    const appointment = await prisma_1.default.appointment.findUnique({ where: { id } });
    if (appointment?.availabilityId) {
        await prisma_1.default.availability.update({ where: { id: appointment.availabilityId }, data: { isBooked: false } });
    }
    return prisma_1.default.appointment.delete({ where: { id } });
}
//# sourceMappingURL=appointment.service.js.map