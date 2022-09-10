"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var router = require("express").Router();
var methodNotAllowed_1 = __importDefault(require("../../src/errors/methodNotAllowed"));
var controller_1 = __importDefault(require("./controller"));
// TODO: Implement the /dishes routes needed to make the tests pass
router.route("/").get(controller_1.default.list).post(controller_1.default.create).all(methodNotAllowed_1.default);
router.route("/:dishId").get(controller_1.default.read).put(controller_1.default.update).all(methodNotAllowed_1.default);
module.exports = router;
//# sourceMappingURL=router.js.map