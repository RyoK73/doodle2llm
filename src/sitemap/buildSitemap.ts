import type { MetadataRoute } from "next";

// The pages that are public and should be indexed.
// The pages under /sketches need sign-in, so they are not listed.
const PUBLIC_PATHS = ["/", "/signin", "/signup"] as const;

// `siteUrl` must not have a trailing slash (`getSiteUrl` guarantees it).
const buildSitemap = (siteUrl: string): MetadataRoute.Sitemap =>
  PUBLIC_PATHS.map((path) => ({ url: `${siteUrl}${path}` }));

export { buildSitemap };
