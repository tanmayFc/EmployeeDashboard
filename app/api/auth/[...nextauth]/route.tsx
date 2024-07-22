import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import DiscordProvider from "next-auth/providers/discord";
import { Session } from "inspector";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: "885729311261-rs6d8fbrans561p1nkj92s88qlvdef0f.apps.googleusercontent.com",
      clientSecret: "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",
    // clientId: process.env.GOOGLE_ID,
    // clientSecret: process.env.GOOGLE_SECRET
    }),
    TwitterProvider({
      clientId: "3jKs0vCgjYSMQ7yCaCpTyZTiE",
      clientSecret: "FhAmICOI7dsxci4EUQE71rcIihNip44LE7EdKFEosOXWYbJm9C"
    // clientId: process.env.GOOGLE_ID,
    // clientSecret: process.env.GOOGLE_SECRET
    }),
    DiscordProvider({
      clientId: "1262725490343673930",
      clientSecret: "7pqsjbWnqqS4E3UPZNYZSDeI10biam9q"
    })
  ],
  // session:{
  //   strategy: "jwt"
  // }
  
  callbacks: {
    async jwt({ token, account}) {
      if (account) {
        token.accessToken = account.access_token
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({session, token}) {
      session.accessToken = token.accessToken
      session.idToken = token.idToken
      console.log("sessionUser", session.accessToken);
      return session;
    },
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};