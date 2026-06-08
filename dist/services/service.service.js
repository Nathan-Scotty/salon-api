"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllServices = findAllServices;
exports.findServiceById = findServiceById;
exports.createService = createService;
exports.updateService = updateService;
exports.deleteService = deleteService;
const prisma_1 = __importDefault(require("../lib/prisma"));
async function findAllServices(activeOnly = false) {
    return prisma_1.default.service.findMany({
        where: activeOnly ? { isActive: true } : undefined,
        orderBy: { name: 'asc' },
    });
}
async function findServiceById(id) {
    return prisma_1.default.service.findUnique({ where: { id } });
}
async function createService(data) {
    return prisma_1.default.service.create({ data });
}
async function updateService(id, data) {
    return prisma_1.default.service.update({ where: { id }, data });
}
async function deleteService(id) {
    return prisma_1.default.service.delete({ where: { id } });
}
//# sourceMappingURL=service.service.js.map