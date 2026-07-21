"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = signup;
exports.signin = signin;
const auth_service_1 = require("../services/auth.service");
const prisma_1 = __importDefault(require("../lib/prisma"));
async function signup(req, res) {
    try {
        const { name, email, passwordHash, phone, role } = req.body;
        if (!name || !email || !passwordHash) {
            return res.status(400).json({ error: 'name, email, and passwordHash are required' });
        }
        const result = await (0, auth_service_1.signupUser)(name, email, passwordHash, phone, role);
        if (!role || role === 'CLIENT') {
            await prisma_1.default.client.create({
                data: { userId: result.id },
            });
        }
        return res.status(201).json({ data: result });
    }
    catch (e) {
        if (e.code === 'DUPLICATE')
            return res.status(409).json({ error: e.message });
        return res.status(500).json({ error: 'Signup failed' });
    }
}
async function signin(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ error: 'email and password are required' });
        const result = await (0, auth_service_1.signinUser)(email, password);
        return res.json({ data: result });
    }
    catch (e) {
        if (e.code === 'INVALID_CREDENTIALS')
            return res.status(401).json({ error: e.message });
        return res.status(500).json({ error: 'Signin failed' });
    }
}
//# sourceMappingURL=auth.controller.js.map