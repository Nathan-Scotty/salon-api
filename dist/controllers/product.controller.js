"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
exports.getById = getById;
exports.create = create;
exports.update = update;
exports.remove = remove;
const product_service_1 = require("../services/product.service");
async function getAll(req, res) {
    try {
        const activeOnly = req.query.active === 'true';
        return res.json({ data: await (0, product_service_1.findAllProducts)(activeOnly) });
    }
    catch {
        return res.status(500).json({ error: 'Failed to fetch products' });
    }
}
async function getById(req, res) {
    try {
        const product = await (0, product_service_1.findProductById)(Number(req.params.id));
        if (!product)
            return res.status(404).json({ error: 'Product not found' });
        return res.json({ data: product });
    }
    catch {
        return res.status(500).json({ error: 'Failed to fetch product' });
    }
}
async function create(req, res) {
    try {
        const { name, price } = req.body;
        if (!name || price === undefined)
            return res.status(400).json({ error: 'name and price are required' });
        return res.status(201).json({ data: await (0, product_service_1.createProduct)(req.body) });
    }
    catch {
        return res.status(500).json({ error: 'Failed to create product' });
    }
}
async function update(req, res) {
    try {
        return res.json({ data: await (0, product_service_1.updateProduct)(Number(req.params.id), req.body) });
    }
    catch (e) {
        if (e.code === 'P2025')
            return res.status(404).json({ error: 'Product not found' });
        return res.status(500).json({ error: 'Failed to update product' });
    }
}
async function remove(req, res) {
    try {
        await (0, product_service_1.deleteProduct)(Number(req.params.id));
        return res.json({ data: { message: 'Product deleted' } });
    }
    catch (e) {
        if (e.code === 'P2025')
            return res.status(404).json({ error: 'Product not found' });
        return res.status(500).json({ error: 'Failed to delete product' });
    }
}
//# sourceMappingURL=product.controller.js.map