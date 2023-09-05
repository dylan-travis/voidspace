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
      const customer = await stripe.customers.list({
        email: userEmail, // Replace with the user's email
        limit: 1, // Limit the results to 1 customer
      });

      let newCart;
      
      if (customer.data.length > 0) {
        // Customer already exists
        const existingCustomer = customer.data[0];
        // Access the existing customer's information using existingCustomer
        console.log('Customer already exists:', existingCustomer);
        newCart = await db.collection("carts").insertOne({
          _id: new ObjectId(),
          stripeId: existingCustomer.id,
          userId: userId,
          username,
          key
        });
      } else {
        // Customer doesn't exist, create a new one
        const newCustomer = await stripe.customers.create({
          email: userEmail, // Replace with the user's email
          metadata: {
            userId: userId, // Include the userId from MongoDB
          },
        });
        console.log('New customer created:', newCustomer);

      // New customer, new cart
      newCart = await db.collection("carts").insertOne({
        _id: new ObjectId(),
        stripeId: newCustomer.id,
        userId: userId,
        username,
        key
      });
      }



      res.json(newCart);
    }
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
