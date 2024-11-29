// file to create the controller for the application

// importing the required modules
import { customer } from "../models/customerSchema.js";

// controller for the app
export const customerController = {
  // for getting all the customers
  getCustomer: async (req, res) => {
    try {
      // for search, pagination and filtering with age
      const search = req.query.search || "";
      const age = req.query.age || "";
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const skip = (page - 1) * limit;

      let query = {};

      // for implementing the search options
      if (search.trim() !== "") {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ];
      }

      if (age) {
        const [minAge, maxAge] = age.split("-").map(Number);
        const currentDate = new Date();
        let minDate, maxDate;

        if (maxAge) {
          minDate = new Date(
            currentDate.getFullYear() - maxAge - 1,
            currentDate.getMonth(),
            currentDate.getDate()
          );
          maxDate = new Date(
            currentDate.getFullYear() - minAge,
            currentDate.getMonth(),
            currentDate.getDate()
          );
        } else {
          // For "51+" case
          maxDate = new Date(
            currentDate.getFullYear() - 51,
            currentDate.getMonth(),
            currentDate.getDate()
          );
        }

        query.dob = maxAge ? { $gte: minDate, $lt: maxDate } : { $lt: maxDate };
      }

      const customers = await customer
        .find(query)
        .sort({ name: 1 })
        .skip(skip)
        .limit(limit);

      if (customers.length === 0) {
        return res.status(404).json({ message: "No customers found" });
      }

      res.status(200).json({ data: customers });
    } catch (error) {
      console.error("error", error);
    }
  },
};
