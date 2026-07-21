"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllClients = findAllClients;
exports.findClientById = findClientById;
exports.createClient = createClient;
exports.updateClient = updateClient;
exports.deleteClient = deleteClient;
const prisma_1 = __importDefault(require("../lib/prisma"));
const include = { user: { select: { id: true, name: true, email: true, phone: true, avatarUrl: true } } };
async function findAllClients() {
    return prisma_1.default.client.findMany({ orderBy: { createdAt: 'desc' }, include });
}
async function findClientById(id) {
    return prisma_1.default.client.findUnique({ where: { id }, include });
}
async function createClient(userId, notes) {
    return prisma_1.default.client.create({ data: { userId, notes } });
}
async function updateClient(id, data) {
    return prisma_1.default.client.update({ where: { id }, data });
}
async function deleteClient(id) {
    return prisma_1.default.client.delete({ where: { id } });
}
//# sourceMappingURL=client.service.js.map