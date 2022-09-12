const { PORT = 5000 } = process.env;

import express from "express";
import cors from "cors";

import errorHandler from "./src/errors/errorHandler";
import notFound from "./src/errors/notFound";
import ordersRouter from "./api/orders/router";
import dishesRouter from "./api/dishes/router";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/dishes", dishesRouter);
app.use("/orders", ordersRouter);

app.use(notFound);

app.use(errorHandler);

const listener = () => console.log(`Listening on Port ${PORT}!`);
app.listen(PORT, listener);

export default app;