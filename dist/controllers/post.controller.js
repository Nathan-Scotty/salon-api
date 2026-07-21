"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
exports.getById = getById;
exports.create = create;
exports.update = update;
exports.remove = remove;
const post_service_1 = require("../services/post.service");
async function getAll(req, res) {
    try {
        const publishedOnly = req.query.published === 'true';
        const category = req.query.category;
        return res.json({ data: await (0, post_service_1.findAllPosts)(publishedOnly, category) });
    }
    catch {
        return res.status(500).json({ error: 'Failed to fetch posts' });
    }
}
async function getById(req, res) {
    try {
        const post = await (0, post_service_1.findPostById)(Number(req.params.id));
        if (!post)
            return res.status(404).json({ error: 'Post not found' });
        return res.json({ data: post });
    }
    catch {
        return res.status(500).json({ error: 'Failed to fetch post' });
    }
}
async function create(req, res) {
    try {
        if (!req.body.authorId)
            return res.status(400).json({ error: 'authorId is required' });
        return res.status(201).json({ data: await (0, post_service_1.createPost)(req.body) });
    }
    catch {
        return res.status(500).json({ error: 'Failed to create post' });
    }
}
async function update(req, res) {
    try {
        return res.json({ data: await (0, post_service_1.updatePost)(Number(req.params.id), req.body) });
    }
    catch (e) {
        if (e.code === 'P2025')
            return res.status(404).json({ error: 'Post not found' });
        return res.status(500).json({ error: 'Failed to update post' });
    }
}
async function remove(req, res) {
    try {
        await (0, post_service_1.deletePost)(Number(req.params.id));
        return res.json({ data: { message: 'Post deleted' } });
    }
    catch (e) {
        if (e.code === 'P2025')
            return res.status(404).json({ error: 'Post not found' });
        return res.status(500).json({ error: 'Failed to delete post' });
    }
}
//# sourceMappingURL=post.controller.js.map