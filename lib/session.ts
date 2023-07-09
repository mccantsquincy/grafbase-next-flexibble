/* 
in the navbar component we will use the getCurrentUser function to check if there is a user logged in. 
files we are touching to make this whole google provider and grafbase user work. 
initlialy in our navbar component we are using session to check if there is a user logged in. In our navbar session is calling getCurrentUser 
which is a function in this file line 95. getCurrentUser is calling getServerSession which is provided by nextauth. Then we are
passing to getServerSession authOptions from line 18. In authOptions we setting up google provider along with its ID and Secret,
JWT, theme, callbacks which is merging the data from google provider and grafbase then returning the newSession which consist data from both sources,
signIn logic where if user exists we will use an action we created getUser and if user doesnt exist we will use a action we created createUser.
*/

import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { SessionInterface, UserProfile } from "@/common.types";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { createUser, getUser } from "./action";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  jwt: {
      encode: ({ secret, token }) => {
        const encodedToken = jsonwebtoken.sign({
            ...token,
            iss: 'grafbase',
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
        }, secret);

        return encodedToken;
      },
      decode: async ({ secret, token }) => {
        const decodedToken = jsonwebtoken.verify(token!, secret);

        return decodedToken as JWT;
      }
  },
  theme: {
    colorScheme: "light",
    logo: "./logo.svg",
  },
  callbacks: {
    async session({ session }) {
      const email = session?.user?.email as string;

      try {
        const data = await getUser(email) as { user?: UserProfile }

        const newSession = {
          ...session,
          // merging both data sources
          user: {
            ...session.user,
            ...data?.user,
          }
        };

        return newSession;

      } catch (error) {
        console.log('Error retrieving user data', error)
        return session;
      }

    },
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        // connecting to database
        // refer to actions.ts to understand getUser function
        // get user if exist
        const userExists = await getUser(user?.email as string) as {
          user?: UserProfile;
        };

        // create user if doesnt exist
        if (!userExists.user) {
          await createUser(
            user.name as string,
            user.email as string,
            user.image as string
          );
        }

        return true;
      } catch (error: any) {
        console.log(error);
        return false;
      }
    },
  },
};

export async function getCurrentUser() {
  const session = await getServerSession(authOptions) as SessionInterface; 
  return session;
}

// we dont just want to return the google user
// the google provider will return the users name, email, and avatarUrl
// our database grafbase will have uour users projects, description, githubUrl, linkedinUrl
// we want to combine our data for our users from google provider and grafbase
// we want to have our session return the data between the two
// to complete this we will populate the session to merge the the users data in our callbacks line 34
