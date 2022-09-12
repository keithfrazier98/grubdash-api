const { PORT = 5000 } = process.env;

import path from "path";
import app from './app'

const listener = () => console.log(`Listening on Port ${PORT}!`);
app.listen(PORT, listener);
