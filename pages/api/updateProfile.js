import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("test");
        const { userId, username, email, phone, address } = req.body;

        console.log("request body is " + userId + username + email + phone + address)
        const userProfile = await db.collection("users").updateOne(
            {
                _id: new ObjectId(userId),
            },
            {
                $set: {
                    username: username,
                    email: email,
                    phone: phone,
                    address: address,
                },
            }
        );

        console.log("userProfile: ", userProfile);
        res.json(userProfile);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};
