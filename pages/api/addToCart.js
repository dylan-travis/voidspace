import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { v4 as uuidv4 } from 'uuid';

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const {
      userId,
      bookingDate,
      bookingHour,
      endBookingDate,
      endBookingHour,
      date,
      confirmed,
      price,
      productName,
      productPrice,
      quantity,
      imgUrl,
      username,
      key,
    } = req.body;

    // Generate a unique ProductId using MongoDB's ObjectId
    const productId = new ObjectId().toString();

    const cartItem = {
      bookingDate,
      bookingHour,
      endBookingDate,
      endBookingHour,
      date,
      confirmed,
      price,
      productName,
      productId, // Use the generated ProductId here
      productPrice,
      quantity,
      imgUrl,
      username,
      key,
    };

    const result = await db.collection("carts").findOneAndUpdate(
      { _id: new ObjectId(userId) },
      {
        $push: { items: cartItem }
      },
      { upsert: true }
    );

    res.json(result.value);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};