import type { Metadata } from "next";
import { AuthPage } from "@/auth-form";

export const metadata: Metadata = { title: "サインイン" };

const page = () => {
  return <AuthPage mode="signin" />;
};

export default page;
