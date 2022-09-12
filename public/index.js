"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = process.env.PORT, PORT = _a === void 0 ? 5000 : _a;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var errorHandler_1 = __importDefault(require("./src/errors/errorHandler"));
var notFound_1 = __importDefault(require("./src/errors/notFound"));
var router_1 = __importDefault(require("./api/orders/router"));
var router_2 = __importDefault(require("./api/dishes/router"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/dishes", router_2.default);
app.use("/orders", router_1.default);
app.use(notFound_1.default);
app.use(errorHandler_1.default);
var listener = function () { return console.log("Listening on Port ".concat(PORT, "!")); };
app.listen(PORT, listener);
exports.default = app;
//# sourceMappingURL=index.js.map