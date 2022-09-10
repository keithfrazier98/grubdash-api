import express from "express";
const router = express.Router()
import methodNotAllowed from "../../src/errors/methodNotAllowed";
import controller from "./controller";

// TODO: Implement the /orders routes needed to make the tests pass

router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed)
router.route("/:orderId").get(controller.read).put(controller.update).delete(controller.destroy).all(methodNotAllowed)

module.exports = router;

