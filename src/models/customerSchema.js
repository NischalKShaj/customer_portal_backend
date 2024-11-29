// file for the customers

// importing the required modules
import { Schema, model } from "mongoose";

// schema
const customersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "modified_at" } }
);

customersSchema.index({ email: 1, phoneNumber: 1 }, { unique: true });

export const customer = model("customers", customersSchema);
