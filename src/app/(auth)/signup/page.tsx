import type { Metadata } from "next";
import { AuthPage } from "@/auth-form";

export const metadata: Metadata = { title: "アカウント登録" };

const page = () => {
  return <AuthPage mode="signup" />;
};

export default page;
