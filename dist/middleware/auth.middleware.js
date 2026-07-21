"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
exports.requireAdmin = requireAdmin;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticate(req, res, next) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing or invalid token' });
    }
    const token = header.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = decoded;
        next();
    }
    catch {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}
function requireAdmin(req, res, next) {
    if (req.user?.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
}
//# sourceMappingURL=auth.middleware.js.map