import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const { firstName, lastName, email, phoneNumber } = req.body;

    // Check if the user with the given email already exists in 'registeredUsers'
    const existingUser = await db.collection("registeredUsers").findOne({ email });

    if (existingUser) {
      // If the user already exists, you can choose to handle it as per your requirements
      res.status(400).json({ error: "User with this email already exists." });
      return;
    }

    const newUser = await db.collection("registeredUsers").findOneAndUpdate({
      firstName,
      lastName,
      email,
      phoneNumber,
    });

    res.json(newUser);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "An error occurred while creating the user." });
  }
};
