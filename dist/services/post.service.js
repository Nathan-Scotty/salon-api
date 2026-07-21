"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllPosts = findAllPosts;
exports.findPostById = findPostById;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
const prisma_1 = __importDefault(require("../lib/prisma"));
const include = {
    author: { select: { id: true, name: true, avatarUrl: true } },
    media: { orderBy: { order: 'asc' } },
};
async function findAllPosts(publishedOnly = false, category) {
    return prisma_1.default.post.findMany({
        where: {
            ...(publishedOnly ? { isPublished: true } : {}),
            ...(category ? { category: category } : {}),
        },
        orderBy: { createdAt: 'desc' },
        include,
    });
}
async function findPostById(id) {
    return prisma_1.default.post.findUnique({ where: { id }, include });
}
async function createPost(data) {
    return prisma_1.default.post.create({ data, include });
}
async function updatePost(id, data) {
    return prisma_1.default.post.update({ where: { id }, data, include });
}
async function deletePost(id) {
    return prisma_1.default.post.delete({ where: { id } });
}
//# sourceMappingURL=post.service.js.map