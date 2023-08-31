import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';


export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const { userId } = req.query; // Updated variable name

    const cart = await db.collection("carts").findOne({ userId });

    if (!cart) {
      console.error("Cart not found");
      return;
    }
  
    // Modify the cart object
    cart.items.forEach((item) => {
      item.confirmed = true;
    });  
    
    // Insert into the "bookings" collection
    const result = await db.collection("bookings").insertOne(cart);
    // Remove from the "carts" collection
    if (result.acknowledged === true) {
      const deleteResult = await db.collection("carts").deleteOne({ userId });
      if (deleteResult.acknowledged === true) {
        console.log("Cart moved to bookings and removed from cart successfully.");
      } else {
        console.error("Error removing cart from the cart collection.");
      }
      return res.status(200).json({ success: true });
    } else {
      console.error("Error inserting into the bookings collection.");
    }
  }
    catch (e) {
        console.error(e);
        throw new Error(e).message;
        }
    };