"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findServicesByAppointment = findServicesByAppointment;
exports.addServiceToAppointment = addServiceToAppointment;
exports.updateAppointmentServicePrice = updateAppointmentServicePrice;
exports.removeServiceFromAppointment = removeServiceFromAppointment;
const prisma_1 = __importDefault(require("../lib/prisma"));
async function findServicesByAppointment(appointmentId) {
    return prisma_1.default.appointmentService.findMany({ where: { appointmentId }, include: { service: true } });
}
async function addServiceToAppointment(appointmentId, serviceId, priceAtTime) {
    return prisma_1.default.appointmentService.create({ data: { appointmentId, serviceId, priceAtTime } });
}
async function updateAppointmentServicePrice(appointmentId, serviceId, priceAtTime) {
    return prisma_1.default.appointmentService.update({
        where: { appointmentId_serviceId: { appointmentId, serviceId } },
        data: { priceAtTime },
    });
}
async function removeServiceFromAppointment(appointmentId, serviceId) {
    return prisma_1.default.appointmentService.delete({
        where: { appointmentId_serviceId: { appointmentId, serviceId } },
    });
}
//# sourceMappingURL=appointmentService.service.js.map