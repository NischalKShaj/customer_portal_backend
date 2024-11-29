// file to setup the server

// importing the required modules
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connection from "./config/database.js";
import customerRoute from "./routes/routes.js";
import insertBulkData from "./utility/seedCustomer.js";
import { corsOptions } from "./config/corsOptions.js";
dotenv.config();

// setting the app
const app = express();

// setting the cors
app.use(cors(corsOptions));

// setting the parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// establishing the connection
connection();

// for creating the fake data
// insertBulkData(5000);

// setting the route
app.get("/test", (req, res) => {
  res.send("hello world");
});

// setting the up the main routes
app.use("/customer", customerRoute);

const port = process.env.PORT;

// starting the server
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
