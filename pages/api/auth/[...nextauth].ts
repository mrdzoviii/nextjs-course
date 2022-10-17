import { verifyPassword } from "./../../../helpers/auth";
import { connectToDatabase } from "./../../../helpers/db";
import NextAuth from "next-auth/next";
import CredentialProvider from "next-auth/providers/credentials";
import { User } from "next-auth";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialProvider({
      credentials: { email: { type: "text" }, password: { type: "password" } },
      async authorize(credentials) {
        const client = await connectToDatabase();
        const db = client.db();

        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

        if (!user) {
          client.close();
          throw new Error("Invalid email or password");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Invalid email or password");
        }

        const loggedUser: User = { id: user._id.toString(), email: user.email };

        client.close();
        return loggedUser;
      },
    }),
  ],
});
