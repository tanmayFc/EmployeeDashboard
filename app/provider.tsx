"use client";
import { SessionProvider } from "next-auth/react";

export interface AuthProvideProps{
    children : React.ReactNode;
}

 export const AuthProvider = ({ children } : AuthProvideProps) => {
    return <SessionProvider>{children}</SessionProvider>;
 };