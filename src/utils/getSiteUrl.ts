import z from "zod";

const LOCAL_SITE_URL = "http://localhost:3000";

// It is read on each call, not at module load, so that tests can change the environment variables.
const siteUrlSchema = z
  .string({ error: "NEXT_PUBLIC_SITE_URLが文字列ではありません" })
  .trim()
  .min(1, { error: "NEXT_PUBLIC_SITE_URLが空です" })
  // When the variable is not set, it falls back to the local URL.
  // On production, the fallback is rejected below because it is not https.
  .default(LOCAL_SITE_URL)
  .refine(
    (siteUrl) =>
      process.env.VERCEL_ENV !== "production" || siteUrl.startsWith("https://"),
    { error: "NEXT_PUBLIC_SITE_URLは本番ではhttps://で始めてください" },
  )
  .transform((siteUrl) => siteUrl.replace(/\/+$/, ""));

// Returns the public URL of the site without a trailing slash.
const getSiteUrl = () => {
  const result = siteUrlSchema.safeParse(process.env.NEXT_PUBLIC_SITE_URL);
  if (!result.success) {
    throw new Error(z.prettifyError(result.error));
  }
  return result.data;
};

export { getSiteUrl };
