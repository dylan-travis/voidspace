import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb"
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Function for finding and assigning ID to a user in Mongo
async function findUserById(userId) {
  try {
    await client.connect();
    const database = client.db('your-database-name'); // Replace 'your-database-name' with your actual database name
    const usersCollection = database.collection('users');

    // Convert the user ID string to an ObjectId
    const userIdObject = new ObjectId(userId);

    // Query for the user with the specified ID
    const user = await usersCollection.findOne({ _id: userIdObject });

    return user;
  } catch (error) {
    console.error('Error occurred:', error);
    return null;
  } finally {
    // Close the connection after the query is done
    client.close();
  }
}


// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    }),
  
  
  ],
  callbacks: {
    async session(session, user) {
      // Fetch user data from MongoDB using the user ID and add it to the session
      if (user && user.id) {
        const foundUser = await findUserById(user.id);
        if (foundUser) {
          session.user = { ...session.user, ...foundUser };
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  // callbacks: {
  //   async jwt({ token }) {
  //     token.userRole = "admin"
  //     return token
  //   },
  debug: false,
}


export default NextAuth(authOptions)
