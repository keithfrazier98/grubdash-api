"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = process.env.PORT, PORT = _a === void 0 ? 5000 : _a;
var app_1 = __importDefault(require("./src/app"));
var listener = function () { return console.log("Listening on Port ".concat(PORT, "!")); };
app_1.default.listen(PORT, listener);
//# sourceMappingURL=index.js.map