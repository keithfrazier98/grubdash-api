const path = require("path");

// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));

// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /orders handlers needed to make the tests pass

function orderExists(req, res, next) {
  const { orderId } = req.params;
  res.locals.order = orders.find((order) => order.id === orderId);

  if (res.locals.order) {
    return next();
  } else {
    next({ status: 404, message: `order ${orderId} does not exist` });
  }
}

function hasProperOrder(req, res, next) {
  const {
    data: { deliverTo, mobileNumber, status, dishes, id } = {},
  } = req.body;
  const { orderId } = req.params;
  const validStatus = ["pending", "delivered", "preparing", "out-for-delivery"];
  if (req.method == "PUT") {
    if (!status || status === "" || !validStatus.includes(status)) {
      next({
        status: 400,
        message:
          "Order must have a status of pending, preparing, out-for-delivery, delivered",
      });
    } else if (status === "delivered") {
      next({ status: 400, message: "A delivered order cannot be changed" });
    } else if (id) {
      if (orderId != id) {
        next({
          status: 400,
          message: `Order id does not match route id. Order: ${id}, Route: ${orderId}.`,
        });
      }
    } else {
      res.locals.status = status;
      res.locals.id = orderId;
    }
  }
  if (!deliverTo || deliverTo === "") {
    return next({ status: 400, message: "Order must include a deliverTo" });
  } else if (!mobileNumber || mobileNumber === "") {
    return next({ status: 400, message: "Order must include a mobileNumber" });
  } else if (!dishes) {
    return next({ status: 400, message: "Order must include a dish" });
  } else if (!Array.isArray(dishes) || dishes.length === 0) {
    return next({
      status: 400,
      message: "Order must include at least one dish",
    });
  } else {
    dishes.forEach((dish, index) => {
      const { quantity } = dish;
      if (!quantity || !Number.isInteger(quantity) || quantity <= 0) {
        return next({
          status: 400,
          message: `Dish ${index} must have a quantity that is an integer greater than 0`,
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
  const order = res.locals.order;
  if (order.status !== "pending") {
    next({
      status: 400,
      message: "An order cannot be deleted unless it is pending",
    });
  } else {
    next();
  }
}

function destroy(req, res, next) {
  const { orderId } = req.params;
  orders.find((order, index) => {
    if (order.id === orderId) {
      orders.slice(index, 1);
    }
  });
  res.sendStatus(204);
}

function create(req, res, next) {
  const newOrder = {
    id: nextId(),
    deliverTo: res.locals.deliverTo,
    mobileNumber: res.locals.mobileNumber,
    status: res.locals.status,
    dishes: res.locals.dishes,
  };
  orders.push(newOrder);
  res.status(201).json({ data: newOrder });
}

function update(req, res, next) {
    const { orderId } = req.params;
  const newOrder = orders.find((order) => {
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

module.exports = {
  list,
  read: [orderExists, read],
  create: [hasProperOrder, create],
  update: [orderExists, hasProperOrder, update],
  destroy: [orderExists, isPending, destroy],
};
