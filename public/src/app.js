"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var errorHandler_1 = __importDefault(require("./errors/errorHandler"));
var notFound_1 = __importDefault(require("./errors/notFound"));
var router_1 = __importDefault(require("../api/orders/router"));
var router_2 = __importDefault(require("../api/dishes/router"));
var app = (0, express_1.default)();
// You have not learned about CORS yet.
// The following line let's this API be used by any website.
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/dishes", router_2.default);
app.use("/orders", router_1.default);
app.use(notFound_1.default);
app.use(errorHandler_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map