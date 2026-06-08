"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllUsers = findAllUsers;
exports.findUserById = findUserById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
const prisma_1 = __importDefault(require("../lib/prisma"));
const safeSelect = {
    id: true, name: true, email: true, phone: true,
    role: true, avatarUrl: true, createdAt: true, updatedAt: true,
};
async function findAllUsers() {
    return prisma_1.default.user.findMany({ orderBy: { createdAt: 'desc' }, select: safeSelect });
}
async function findUserById(id) {
    return prisma_1.default.user.findUnique({ where: { id }, select: safeSelect });
}
async function updateUser(id, data) {
    return prisma_1.default.user.update({ where: { id }, data, select: safeSelect });
}
async function deleteUser(id) {
    return prisma_1.default.user.delete({ where: { id } });
}
//# sourceMappingURL=user.service.js.map