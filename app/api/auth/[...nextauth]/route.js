import { BACKEND_URI } from "@/app/CONSTANTS";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            const res = await fetch(`${BACKEND_URI}/users/googleAuth`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user.email,
                }),
            })
    
            const data = await res.json()

            if (data.success) {
                return true
            } else {
                return false
            }
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken
            session.refreshToken = token.refreshToken
            return session
        },
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token
                token.refreshToken = account.refresh_token
            }
            return token
        },
    },
})

export {handler as GET, handler as POST}