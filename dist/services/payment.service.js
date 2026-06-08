"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllPayments = findAllPayments;
exports.findPaymentById = findPaymentById;
exports.createPayment = createPayment;
exports.updatePayment = updatePayment;
exports.deletePayment = deletePayment;
const prisma_1 = __importDefault(require("../lib/prisma"));
async function findAllPayments() {
    return prisma_1.default.payment.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            client: { include: { user: { select: { name: true, email: true } } } },
            appointment: { select: { scheduledAt: true, status: true } },
        },
    });
}
async function findPaymentById(id) {
    return prisma_1.default.payment.findUnique({
        where: { id },
        include: {
            client: { include: { user: { select: { name: true, email: true } } } },
            appointment: true,
        },
    });
}
async function createPayment(data) {
    return prisma_1.default.payment.create({ data });
}
async function updatePayment(id, data) {
    const { paidAt, ...rest } = data;
    return prisma_1.default.payment.update({
        where: { id },
        data: { ...rest, ...(paidAt ? { paidAt: new Date(paidAt) } : {}) },
    });
}
async function deletePayment(id) {
    return prisma_1.default.payment.delete({ where: { id } });
}
//# sourceMappingURL=payment.service.js.map