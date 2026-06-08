"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllAvailabilities = findAllAvailabilities;
exports.findAvailabilityById = findAvailabilityById;
exports.createAvailability = createAvailability;
exports.updateAvailability = updateAvailability;
exports.deleteAvailability = deleteAvailability;
const prisma_1 = __importDefault(require("../lib/prisma"));
async function findAllAvailabilities(stylistId, availableOnly = false) {
    return prisma_1.default.availability.findMany({
        where: {
            ...(stylistId ? { stylistId } : {}),
            ...(availableOnly ? { isBooked: false } : {}),
        },
        orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
        include: { stylist: { include: { user: { select: { name: true } } } } },
    });
}
async function findAvailabilityById(id) {
    return prisma_1.default.availability.findUnique({
        where: { id },
        include: { stylist: { include: { user: { select: { name: true } } } } },
    });
}
async function createAvailability(stylistId, date, startTime, endTime) {
    return prisma_1.default.availability.create({
        data: {
            stylistId,
            date: new Date(date),
            startTime: new Date(`1970-01-01T${startTime}:00`),
            endTime: new Date(`1970-01-01T${endTime}:00`),
        },
    });
}
async function updateAvailability(id, data) {
    return prisma_1.default.availability.update({
        where: { id },
        data: {
            ...(data.date ? { date: new Date(data.date) } : {}),
            ...(data.startTime ? { startTime: new Date(`1970-01-01T${data.startTime}:00`) } : {}),
            ...(data.endTime ? { endTime: new Date(`1970-01-01T${data.endTime}:00`) } : {}),
            ...(data.isBooked !== undefined ? { isBooked: data.isBooked } : {}),
        },
    });
}
async function deleteAvailability(id) {
    return prisma_1.default.availability.delete({ where: { id } });
}
//# sourceMappingURL=availability.service.js.map