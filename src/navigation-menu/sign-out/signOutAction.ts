"use server";
import { logError } from "@/error-logging";
import { signOut } from "@/supabase/auth/signOut";
import { createSupabaseAnonActionClient } from "@/supabase/utils/anonActionClient";
import { redirect } from "next/navigation";

type SignOutState = { error: string } | undefined;

const signOutAction = async (): Promise<SignOutState> => {
  const supabaseClient = await createSupabaseAnonActionClient();
  const result = await signOut(supabaseClient);
  if (!result.ok) {
    logError(result.error, { feature: "sign-out" });
    return { error: "サインアウトに失敗しました" };
  }
  redirect("/");
};

export { signOutAction };
