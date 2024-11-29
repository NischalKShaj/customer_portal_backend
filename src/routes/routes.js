// file to manage the route of the application

// importing the required modules
import express from "express";
import { customerController } from "../controller/customer.js";

// setting the routes
const router = express.Router();

// creating the required route
router.get("/", customerController.getCustomer);

export default router;
