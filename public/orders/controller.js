"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
// Use the existing order data
var orders = require(path_1.default.resolve("src/data/orders-data"));
// Use this function to assigh ID's when necessary
var nextId_1 = __importDefault(require("../../src/utils/nextId"));
// TODO: Implement the /orders handlers needed to make the tests pass
function orderExists(req, res, next) {
    var orderId = req.params.orderId;
    res.locals.order = orders.find(function (order) { return order.id === orderId; });
    if (res.locals.order) {
        return next();
    }
    else {
        next({ status: 404, message: "order ".concat(orderId, " does not exist") });
    }
}
function hasProperOrder(req, res, next) {
    var _a = req.body.data, deliverTo = _a.deliverTo, mobileNumber = _a.mobileNumber, status = _a.status, dishes = _a.dishes, id = _a.id;
    var orderId = req.params.orderId;
    var validStatus = ["pending", "delivered", "preparing", "out-for-delivery"];
    if (req.method == "PUT") {
        if (!status || status === "" || !validStatus.includes(status)) {
            next({
                status: 400,
                message: "Order must have a status of pending, preparing, out-for-delivery, delivered",
            });
        }
        else if (status === "delivered") {
            next({ status: 400, message: "A delivered order cannot be changed" });
        }
        else if (id) {
            if (orderId != id) {
                next({
                    status: 400,
                    message: "Order id does not match route id. Order: ".concat(id, ", Route: ").concat(orderId, "."),
                });
            }
        }
        else {
            res.locals.status = status;
            res.locals.id = orderId;
        }
    }
    if (!deliverTo || deliverTo === "") {
        return next({ status: 400, message: "Order must include a deliverTo" });
    }
    else if (!mobileNumber || mobileNumber === "") {
        return next({ status: 400, message: "Order must include a mobileNumber" });
    }
    else if (!dishes) {
        return next({ status: 400, message: "Order must include a dish" });
    }
    else if (!Array.isArray(dishes) || dishes.length === 0) {
        return next({
            status: 400,
            message: "Order must include at least one dish",
        });
    }
    else {
        dishes.forEach(function (dish, index) {
            var quantity = dish.quantity;
            if (!quantity || !Number.isInteger(quantity) || quantity <= 0) {
                return next({
                    status: 400,
                    message: "Dish ".concat(index, " must have a quantity that is an integer greater than 0"),
                });
            }
        });
    }
    res.locals.deliverTo = deliverTo;
    res.locals.mobileNumber = mobileNumber;
    res.locals.dishes = dishes;
    res.locals.status = status;
    next();
}
function isPending(req, res, next) {
    var order = res.locals.order;
    if (order.status !== "pending") {
        next({
            status: 400,
            message: "An order cannot be deleted unless it is pending",
        });
    }
    else {
        next();
    }
}
function destroy(req, res, next) {
    var orderId = req.params.orderId;
    orders.find(function (order, index) {
        if (order.id === orderId) {
            orders.slice(index, 1);
        }
    });
    res.sendStatus(204);
}
function create(req, res, next) {
    var newOrder = {
        id: (0, nextId_1.default)(),
        deliverTo: res.locals.deliverTo,
        mobileNumber: res.locals.mobileNumber,
        status: res.locals.status,
        dishes: res.locals.dishes,
    };
    orders.push(newOrder);
    res.status(201).json({ data: newOrder });
}
function update(req, res, next) {
    var orderId = req.params.orderId;
    var newOrder = orders.find(function (order) {
        if ((order.id = orderId)) {
            (order.id = orderId),
                (order.status = res.locals.status),
                (order.deliverTo = res.locals.deliverTo),
                (order.mobileNumber = res.locals.mobileNumber),
                (order.dishes = res.locals.dishes);
        }
        return order;
    });
    res.status(200).json({ data: newOrder });
}
function list(req, res, next) {
    res.status(200).json({
        data: orders,
    });
}
function read(req, res, next) {
    res.status(200).json({ data: res.locals.order });
}
exports.default = {
    list: list,
    read: [orderExists, read],
    create: [hasProperOrder, create],
    update: [orderExists, hasProperOrder, update],
    destroy: [orderExists, isPending, destroy],
};
//# sourceMappingURL=controller.js.map