import NextAuth from 'next-auth'
import CredentialsProvider, { CredentialsConfig } from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { PrismaAdapter } from "@next-auth/prisma-adapter"

const prisma = new PrismaClient()

interface Token {
    id: string;
    email: string;
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'john@doe.com' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                if (!credentials) return null
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                })

                if (
                    user &&
                    (await bcrypt.compare(credentials.password, user.password))
                ) {
                    return {
                        id: user.id,
                        email: user.email
                    }
                } else {
                    throw new Error('Invalid email or password')
                }
            },
        })
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        jwt: async ({ token, user }: { token: Token; user: any }) => {
            if (user) {
                token.id = user.id
            }
            return token
        },
        session: async ({ session, token }: { session: any; token: Token }) => {
            if (session.user) {
                session.user.id = token.id
            }
            return session
        }
    },
}as any

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };