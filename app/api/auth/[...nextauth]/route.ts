
import NextAuth, {Account , User as AuthUser} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {checklogin} from "../../../../lib/actions/user.actions"



export const authOptions: any = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: 'Credentials',
            credentials: {
              username: { label: "Username", type: "text", placeholder: "jsmith" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any,req) {
               return await checklogin(credentials)
            },
        }),
    ],
    pages: {
        signIn: '/login',
        newUser: '/register'
    },
    callbacks:{
        async signIn({user,account}:{user : AuthUser , account : Account}){
            if(account?.provider=="credentials"){
                return true;
            }
        }
    }

}
export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };