"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const client_routes_1 = __importDefault(require("./routes/client.routes"));
const stylist_routes_1 = __importDefault(require("./routes/stylist.routes"));
const service_routes_1 = __importDefault(require("./routes/service.routes"));
const availability_routes_1 = __importDefault(require("./routes/availability.routes"));
const appointment_routes_1 = __importDefault(require("./routes/appointment.routes"));
const appointmentService_routes_1 = __importDefault(require("./routes/appointmentService.routes"));
const payment_routes_1 = __importDefault(require("./routes/payment.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const media_routes_1 = __importDefault(require("./routes/media.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use('/auth', auth_routes_1.default);
app.use('/users', user_routes_1.default);
app.use('/clients', client_routes_1.default);
app.use('/stylists', stylist_routes_1.default);
app.use('/services', service_routes_1.default);
app.use('/availability', availability_routes_1.default);
app.use('/appointments', appointment_routes_1.default);
app.use('/appointment-services', appointmentService_routes_1.default);
app.use('/payments', payment_routes_1.default);
app.use('/products', product_routes_1.default);
app.use('/posts', post_routes_1.default);
app.use('/media', media_routes_1.default);
app.get('/health', (_, res) => res.json({ status: 'ok' }));
app.use((_req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
app.listen(PORT, () => {
    console.log(`🚀 Salon API running on http://localhost:${PORT}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map