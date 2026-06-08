"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
exports.getById = getById;
exports.update = update;
exports.remove = remove;
const user_service_1 = require("../services/user.service");
async function getAll(_req, res) {
    try {
        return res.json({ data: await (0, user_service_1.findAllUsers)() });
    }
    catch {
        return res.status(500).json({ error: 'Failed to fetch users' });
    }
}
async function getById(req, res) {
    try {
        const user = await (0, user_service_1.findUserById)(Number(req.params.id));
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        return res.json({ data: user });
    }
    catch {
        return res.status(500).json({ error: 'Failed to fetch user' });
    }
}
async function update(req, res) {
    try {
        return res.json({ data: await (0, user_service_1.updateUser)(Number(req.params.id), req.body) });
    }
    catch (e) {
        if (e.code === 'P2025')
            return res.status(404).json({ error: 'User not found' });
        return res.status(500).json({ error: 'Failed to update user' });
    }
}
async function remove(req, res) {
    try {
        await (0, user_service_1.deleteUser)(Number(req.params.id));
        return res.json({ data: { message: 'User deleted' } });
    }
    catch (e) {
        if (e.code === 'P2025')
            return res.status(404).json({ error: 'User not found' });
        return res.status(500).json({ error: 'Failed to delete user' });
    }
}
//# sourceMappingURL=user.controller.js.map