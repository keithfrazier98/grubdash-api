const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./dishes.controller");

// TODO: Implement the /dishes routes needed to make the tests pass

router.route("/").get(controller.list).post(controller.create);
router.route("/:dishId").get(controller.read).delete(methodNotAllowed).put(controller.update)

module.exports = router;