import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const { userId, id, bookingDate, bookingHour, date, confirmed, price, productName, productPrice, quantity, endBookingDate, endBookingHour, imgUrl, username } = req.body;

    const cart = await db.collection("carts").insertOne({
      _id: new ObjectId(userId),
      userId: id,
      bookingDate,
      bookingHour,
      endBookingDate,
      endBookingHour,
      date,
      confirmed: false,
      price,
      productName,
      productPrice,
      quantity,
      imgUrl,
      username
    });

    res.json(cart);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};