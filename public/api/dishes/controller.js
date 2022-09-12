"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Use the existing dishes data
var dishes_data_1 = __importDefault(require("../../src/data/dishes-data"));
// Use this function to assign ID's when necessary
var nextId_1 = __importDefault(require("../../src/utils/nextId"));
// TODO: Implement the /dishes handlers needed to make the tests pass
function isProperDish(req, res, next) {
    var _a = req.body.data, name = _a.name, description = _a.description, price = _a.price, image_url = _a.image_url;
    if (!name || name === "") {
        next({ status: 400, message: "Dish must include a name" });
    }
    else if (!description || description == "") {
        next({ status: 400, message: "Dish must include a description" });
    }
    else if (!price) {
        next({ status: 400, message: "Dish must include a price" });
    }
    else if (!image_url || image_url == "") {
        next({ status: 400, message: "Dish must include a image_url" });
    }
    else if (!Number.isInteger(price) || Number(price) <= 0) {
        next({
            status: 400,
            message: "Dish must have a price that is an integer greater than 0",
        });
    }
    else {
        res.locals.name = name;
        res.locals.description = description;
        res.locals.price = price;
        res.locals.image_url = image_url;
        next();
    }
}
function dishExists(req, res, next) {
    var dishId = req.params.dishId;
    var dish = dishes_data_1.default.find(function (dish, index) {
        if (dish.id === dishId) {
            res.locals.foundDishIndex = index;
            return dish;
        }
    });
    if (!dish) {
        next({ status: 404, message: "dish ".concat(dishId, " does not exist") });
    }
    else {
        res.locals.dish = dish;
        next();
    }
}
function read(req, res, next) {
    if (res.locals.dish) {
        res.status(200).json({ data: res.locals.dish });
    }
    else {
        next({ status: 404 });
    }
}
function create(req, res, next) {
    var newId = (0, nextId_1.default)();
    var newDish = {
        id: newId,
        name: res.locals.name,
        description: res.locals.description,
        price: res.locals.price,
        image_url: res.locals.image_url,
    };
    dishes_data_1.default.push(newDish);
    res.status(201).json({ data: newDish });
}
function list(req, res, next) {
    res.status(200).json({ data: dishes_data_1.default });
}
function update(req, res, next) {
    var dishId = req.params.dishId;
    var id = req.body.data.id;
    if (id) {
        console.log(id, dishId, typeof id, typeof dishId);
        if (id !== dishId) {
            return next({ status: 400, message: "Url id ".concat(dishId, " does not match request body id ").concat(id, ".") });
        }
    }
    if (res.locals.dish) {
        var newDish = dishes_data_1.default.find(function (dish) {
            if (dish.id === dishId) {
                dish.name = res.locals.name;
                dish.description = res.locals.description;
                dish.price = res.locals.price;
                dish.image_url = res.locals.image_url;
            }
            return dish;
        });
        res.status(200).json({ data: newDish });
    }
    else {
        next({ status: 404 });
    }
}
exports.default = {
    list: list,
    create: [isProperDish, create],
    read: [dishExists, read],
    update: [dishExists, isProperDish, update],
};
//# sourceMappingURL=controller.js.map