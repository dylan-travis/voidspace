import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const { userId, key, id, bookingDate, bookingHour, engineer, date, confirmed, price, productName, productPrice, quantity, endBookingDate, endBookingHour, imgUrl, username } = req.body;

    const booking = await db.collection("bookings").insertOne({
      _id: new ObjectId(userId),
      userId: id,
      bookingDate,
      engineer,
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

    });

    res.json(booking);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};