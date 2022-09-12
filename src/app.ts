import express from "express";
import cors from "cors";

import errorHandler from "./errors/errorHandler";
import notFound from "./errors/notFound";
import ordersRouter from "../api/orders/router";
import dishesRouter from "../api/dishes/router";

const app = express();

// You have not learned about CORS yet.
// The following line let's this API be used by any website.
app.use(cors());
app.use(express.json());

app.use("/dishes", dishesRouter);
app.use("/orders", ordersRouter);

app.use(notFound);

app.use(errorHandler);

export default app;
