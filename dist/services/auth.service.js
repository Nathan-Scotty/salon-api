"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupUser = signupUser;
exports.signinUser = signinUser;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../lib/prisma"));
async function signupUser(name, email, password, phone, role) {
    const existing = await prisma_1.default.user.findUnique({ where: { email } });
    if (existing)
        throw Object.assign(new Error('Email already in use'), { code: 'DUPLICATE' });
    const passwordHash = await bcrypt_1.default.hash(password, 10);
    const user = await prisma_1.default.user.create({
        data: { name, email, passwordHash, phone, role: role || 'CLIENT' },
    });
    const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    return { id: user.id, token };
}
async function signinUser(email, password) {
    const user = await prisma_1.default.user.findUnique({ where: { email } });
    if (!user)
        throw Object.assign(new Error('Invalid credentials'), { code: 'INVALID_CREDENTIALS' });
    const match = await bcrypt_1.default.compare(password, user.passwordHash);
    if (!match)
        throw Object.assign(new Error('Invalid credentials'), { code: 'INVALID_CREDENTIALS' });
    const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    return { id: user.id, token };
}
//# sourceMappingURL=auth.service.js.map