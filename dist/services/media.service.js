"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMediaByPost = findMediaByPost;
exports.findMediaById = findMediaById;
exports.createMedia = createMedia;
exports.updateMedia = updateMedia;
exports.deleteMedia = deleteMedia;
const prisma_1 = __importDefault(require("../lib/prisma"));
async function findMediaByPost(postId) {
    return prisma_1.default.media.findMany({ where: { postId }, orderBy: { order: 'asc' } });
}
async function findMediaById(id) {
    return prisma_1.default.media.findUnique({ where: { id } });
}
async function createMedia(data) {
    return prisma_1.default.media.create({ data });
}
async function updateMedia(id, data) {
    return prisma_1.default.media.update({ where: { id }, data });
}
async function deleteMedia(id) {
    return prisma_1.default.media.delete({ where: { id } });
}
//# sourceMappingURL=media.service.js.map