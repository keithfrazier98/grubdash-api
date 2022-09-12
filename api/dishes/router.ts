const router = require("express").Router();
import methodNotAllowed from "../../src/errors/methodNotAllowed";
import controller from "./controller";

// TODO: Implement the /dishes routes needed to make the tests pass

router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed)
router.route("/:dishId").get(controller.read).put(controller.update).all(methodNotAllowed)

export default router