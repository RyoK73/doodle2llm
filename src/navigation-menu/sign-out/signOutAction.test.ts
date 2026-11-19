import { signOut } from "@/supabase/auth/signOut";
import { signOutAction } from "@/navigation-menu/sign-out/signOutAction";
import { redirect } from "next/navigation";
import { logError } from "@/error-logging";

vi.mock("@/error-logging", () => ({ logError: vi.fn() }));
vi.mock("@/supabase/utils/anonActionClient", () => ({
  createSupabaseAnonActionClient: vi.fn(),
}));
vi.mock("@/supabase/auth/signOut", () => ({
  signOut: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

it("should call `redirect` with `/` when `ok: true` is returned ", async () => {
  vi.mocked(signOut).mockResolvedValue({ ok: true, value: undefined });
  await signOutAction();
  expect(redirect).toHaveBeenCalledWith("/");
  expect(logError).not.toHaveBeenCalled();
});

it("should return error: 'サインアウトに失敗しました' and not call `redirect` when `ok: false` is returned", async () => {
  vi.mocked(signOut).mockResolvedValue({ ok: false, error: new Error("test") });
  const result = await signOutAction();
  expect(result).toEqual({ error: "サインアウトに失敗しました" });
  expect(redirect).not.toHaveBeenCalled();
});

it("should log the error as the feature sign-out when `ok: false` is returned", async () => {
  const error = new Error("test");
  vi.mocked(signOut).mockResolvedValue({ ok: false, error });

  await signOutAction();

  expect(logError).toHaveBeenCalledOnce();
  expect(logError).toHaveBeenCalledWith(error, { feature: "sign-out" });
});
