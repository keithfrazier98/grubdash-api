"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var methodNotAllowed_1 = __importDefault(require("../../src/errors/methodNotAllowed"));
var controller_1 = __importDefault(require("./controller"));
// TODO: Implement the /orders routes needed to make the tests pass
router.route("/").get(controller_1.default.list).post(controller_1.default.create).all(methodNotAllowed_1.default);
router.route("/:orderId").get(controller_1.default.read).put(controller_1.default.update).delete(controller_1.default.destroy).all(methodNotAllowed_1.default);
exports.default = router;
//# sourceMappingURL=router.js.map