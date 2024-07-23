import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import DiscordProvider from "next-auth/providers/discord";
import { Session } from "inspector";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: "885729311261-rs6d8fbrans561p1nkj92s88qlvdef0f.apps.googleusercontent.com",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
    // clientId: process.env.GOOGLE_ID,
    // clientSecret: process.env.GOOGLE_SECRET
    }),
    TwitterProvider({
      clientId: "3jKs0vCgjYSMQ7yCaCpTyZTiE",
      clientSecret: process.env.NEXT_PUBLIC_TWITTER_CLIENT_SECRET
    // clientId: process.env.GOOGLE_ID,
    // clientSecret: process.env.GOOGLE_SECRET
    }),
    DiscordProvider({
      clientId: "1262725490343673930",
      clientSecret: process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET
    })
  ]
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};