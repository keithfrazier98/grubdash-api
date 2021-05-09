const path = require("path");

// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));

// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /orders handlers needed to make the tests pass

function orderExists(req, res, next) {
  const { orderId } = req.params;
  if (orderId) {
    res.locals.order = orders.find((order) => order.id === orderId);
    return next();
  } else {
    next({ status: 404 });
  }
}


function hasProperOrder(req, res, next) {
  const { data: { deliverTo, mobileNumber, status, dishes } = {} } = req.body;
  console.log(mobileNumber, deliverTo, status, dishes)
  if (!deliverTo || deliverTo === "") {
    return next({ status: 400, message: "Order must include a deliverTo" });
  } else if (!mobileNumber || mobileNumber === "") {
    return next({ status: 400, message: "Order must include a mobileNumber" });
  } else if (!dishes) {
    return next({ status: 400, message: "Order must include a dish" });
  } else if (!Array.isArray(dishes) || dishes.length === 0) {
    return next({ status: 400, message: "Order must include at least one dish" });
  } else {
      dishes.forEach((dish, index) => {
        const {quantity} = dish
        if(!quantity || !Number.isInteger(quantity) || quantity <= 0){
            return next({status:400, message:`Dish ${index} must have a quantity that is an integer greater than 0`})
        }
    })
  }
  res.locals.deliverTo = deliverTo
  res.locals.mobileNumber = mobileNumber
  res.locals.status = status
  res.locals.dishes = dishes
  next()

}

function create(req, res, next){
     const newOrder  = {
        id :nextId(),
        deliverTo: res.locals.deliverTo,
        mobileNumber: res.locals.mobileNumber,
        status: res.locals.status, 
        dishes: res.locals.dishes
    }
    orders.push(newOrder)
    res.status(201).json({data:newOrder})

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
  create: [hasProperOrder, create]
};
