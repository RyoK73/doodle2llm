import z from "zod";

const LOCAL_SITE_URL = "http://localhost:3000";

// Only these values of VERCEL_ENV require https. Any other value is not validated.
const HTTPS_REQUIRED_VERCEL_ENVS = ["production", "preview"];

// It is read on each call, not at module load, so that tests can change the environment variables.
const siteUrlSchema = z
  .string({ error: "NEXT_PUBLIC_SITE_URLが文字列ではありません" })
  .trim()
  .min(1, { error: "NEXT_PUBLIC_SITE_URLが空です" })
  // When the variable is not set, it falls back to the local URL.
  // On production and preview, the fallback is rejected below because it is not https.
  .default(LOCAL_SITE_URL)
  .refine(
    (siteUrl) =>
      !HTTPS_REQUIRED_VERCEL_ENVS.includes(process.env.VERCEL_ENV ?? "") ||
      siteUrl.startsWith("https://"),
    {
      error:
        "NEXT_PUBLIC_SITE_URLはVercelの本番とプレビューではhttps://で始めてください",
    },
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
