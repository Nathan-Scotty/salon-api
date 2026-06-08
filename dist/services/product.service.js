"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllProducts = findAllProducts;
exports.findProductById = findProductById;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
const prisma_1 = __importDefault(require("../lib/prisma"));
async function findAllProducts(activeOnly = false) {
    return prisma_1.default.product.findMany({
        where: activeOnly ? { isActive: true } : undefined,
        orderBy: { name: 'asc' },
    });
}
async function findProductById(id) {
    return prisma_1.default.product.findUnique({ where: { id } });
}
async function createProduct(data) {
    return prisma_1.default.product.create({ data });
}
async function updateProduct(id, data) {
    return prisma_1.default.product.update({ where: { id }, data });
}
async function deleteProduct(id) {
    return prisma_1.default.product.delete({ where: { id } });
}
//# sourceMappingURL=product.service.js.map