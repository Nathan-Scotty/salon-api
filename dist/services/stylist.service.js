"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllStylists = findAllStylists;
exports.findStylistById = findStylistById;
exports.createStylist = createStylist;
exports.updateStylist = updateStylist;
exports.deleteStylist = deleteStylist;
const prisma_1 = __importDefault(require("../lib/prisma"));
const include = { user: { select: { id: true, name: true, email: true, phone: true, avatarUrl: true } } };
async function findAllStylists() {
    return prisma_1.default.stylist.findMany({ orderBy: { createdAt: 'desc' }, include });
}
async function findStylistById(id) {
    return prisma_1.default.stylist.findUnique({
        where: { id },
        include: { ...include, availabilities: { orderBy: { date: 'asc' } } },
    });
}
async function createStylist(userId, bio, specialties) {
    return prisma_1.default.stylist.create({ data: { userId, bio, specialties } });
}
async function updateStylist(id, data) {
    // Handle avatarUrl update separately on the User model
    const { avatarUrl, ...stylistData } = data;
    if (avatarUrl) {
        const stylist = await prisma_1.default.stylist.findUnique({ where: { id } });
        if (stylist) {
            await prisma_1.default.user.update({
                where: { id: stylist.userId },
                data: { avatarUrl },
            });
        }
    }
    return prisma_1.default.stylist.update({ where: { id }, data: stylistData, include });
}
async function deleteStylist(id) {
    return prisma_1.default.stylist.delete({ where: { id } });
}
//# sourceMappingURL=stylist.service.js.map