import path from "path";

// Use the existing dishes data
import dishes from '../../src/data/dishes-data' ;

// Use this function to assign ID's when necessary
import nextId from "../../src/utils/nextId";

// TODO: Implement the /dishes handlers needed to make the tests pass
function isProperDish(req, res, next) {
  const { data: { name, description, price, image_url } } = req.body;
  if (!name || name === "") {
    next({ status: 400, message: "Dish must include a name" });
  } else if (!description || description == "") {
    next({ status: 400, message: "Dish must include a description" });
  } else if (!price) {
    next({ status: 400, message: "Dish must include a price" });
  } else if (!image_url || image_url == "") {
    next({ status: 400, message: "Dish must include a image_url" });
  } else if (!Number.isInteger(price) || Number(price) <= 0) {
    next({
      status: 400,
      message: "Dish must have a price that is an integer greater than 0",
    });
  } else {
    res.locals.name = name;
    res.locals.description = description;
    res.locals.price = price;
    res.locals.image_url = image_url;
    next();
  }
}


function dishExists(req, res, next) {
  const { dishId } = req.params;
  const dish = dishes.find((dish, index) => {
    if (dish.id === dishId) {
      res.locals.foundDishIndex = index;
      return dish;
    }
  });

  if (!dish) {
    next({ status: 404, message: `dish ${dishId} does not exist` });
  } else {
    res.locals.dish = dish;
    next();
  }
}

function read(req, res, next) {
  if (res.locals.dish) {
    res.status(200).json({ data: res.locals.dish });
  } else {
    next({ status: 404 });
  }
}

function create(req, res, next) {
  const newId = nextId();
  const newDish = {
    id: newId,
    name: res.locals.name,
    description: res.locals.description,
    price: res.locals.price,
    image_url: res.locals.image_url,
  };
  dishes.push(newDish);
  res.status(201).json({ data: newDish });
}

function list(req, res, next) {
  res.status(200).json({ data: dishes });
}

function update(req, res, next) {
  const { dishId } = req.params;
  const {
    data: { id },
  } = req.body;
  if (id) {
    console.log(id, dishId, typeof id, typeof dishId)
    if (id !== dishId) {
     return next({ status: 400, message: `Url id ${dishId} does not match request body id ${id}.` });
    }
  } 

  if (res.locals.dish) {
    const newDish = dishes.find((dish) => {
      if (dish.id === dishId) {
        dish.name = res.locals.name;
        dish.description = res.locals.description;
        dish.price = res.locals.price;
        dish.image_url = res.locals.image_url;
      }
      return dish;
    });
    res.status(200).json({ data: newDish });
  } else {
    next({ status: 404 });
  }
}

export default {
  list,
  create: [isProperDish, create],
  read: [dishExists, read],
  update: [dishExists, isProperDish, update],
};
