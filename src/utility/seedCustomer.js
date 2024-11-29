// for generating the data and storing in the db

// importing the required modules
import { customer } from "../models/customerSchema.js";
import { faker } from "@faker-js/faker";

// for generating the fake data
const generateFakeData = (count) => {
  const customers = [];
  const emailSet = new Set();
  const phoneSet = new Set();

  // for adding the data
  while (customers.length < count) {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const phoneNumber = faker.phone.number("##########");
    const dob = faker.date.birthdate({ min: 18, max: 65, mode: "age" });

    if (!emailSet.has(email) && !phoneSet.has(phoneNumber)) {
      customers.push({ name, email, phoneNumber, dob });
      emailSet.add(email);
      phoneSet.add(phoneNumber);
    }
  }
  return customers;
};

// for inserting the entire data in bulk
const insertBulkData = async (batchSize) => {
  try {
    const totalRecords = 1000000;

    // check if there are existing records
    const existingCount = await customer.countDocuments();

    if (existingCount > 0) {
      console.log(`Found ${existingCount} existing records. Deleting them...`);
      await customer.deleteMany({});
    } else {
      console.log("No existing data found. Proceeding with fresh insertion...");
    }

    // insert new data in batches
    for (let i = 0; i < totalRecords; i += batchSize) {
      const fakeCustomers = generateFakeData(batchSize);

      // prepare bulk operations
      const bulkOps = fakeCustomers.map((cust) => ({
        updateOne: {
          filter: {
            $or: [{ email: cust.email }, { phoneNumber: cust.phoneNumber }],
          },
          update: { $setOnInsert: cust },
          upsert: true,
        },
      }));

      // execute bulk write
      await customer.bulkWrite(bulkOps);
    }

    console.log("All records inserted successfully.");
  } catch (error) {
    console.error("Error during bulk insertion:", error);
  }
};

export default insertBulkData;
