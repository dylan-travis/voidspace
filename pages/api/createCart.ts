import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2022-11-15',
});

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const { _id, userId, username, userEmail, key } = req.body;

    // Check if a cart already exists for the user
    const existingCart = await db.collection("carts").findOne({ userId });

    if (existingCart) {
      // If a cart exists, do nothing and return the existing cart
      res.json(existingCart);
    } else {
      //Create new Stripe user
      const customer = await stripe.customers.create({
        email: userEmail, // Replace with the user's email
        metadata: {
          userId: userId, // Include the userId from MongoDB
        },
      });
      console.log("customer created: " + JSON.stringify(customer))
      // If no cart exists, create a new cart
      const newCart = await db.collection("carts").insertOne({
        _id: new ObjectId(),
        stripeId: customer.id,
        userId: userId,
        username,
        key
      });

      res.json(newCart);
    }
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
