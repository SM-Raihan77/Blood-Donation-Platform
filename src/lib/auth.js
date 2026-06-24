import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { role } from "better-auth/client";

const client = new MongoClient(process.env.DB_URI);
const db = client.db(process.env.DB_NAME);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  user: {
        additionalFields: {
            phone: { type: "string" },
            gender: { type: "string" },
            bloodGroup: { type: "string" },
            district: { type: "string" },
            upazila: { type: "string" },
            role:{
              defaultValue: "donor",
              type: "string",
            }
        },
    },
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
});