import { AppName } from "@/constants/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login or Sign Up",
    description: `Log in or sign up to connect, collaborate, and build with developers on ${AppName}.`,
    alternates: {
        canonical: "/auth/login",
    },
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}