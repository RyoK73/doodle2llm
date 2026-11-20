import type { MetadataRoute } from "next";

// DISALLOWED_PATHS lists the paths that crawlers must not visit.
// The pages under /sketches need sign-in, so crawlers cannot read them anyway.
const DISALLOWED_PATHS = ["/sketches"] as const;

// `siteUrl` must not have a trailing slash (`getSiteUrl` guarantees it).
const buildRobots = (siteUrl: string): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    disallow: [...DISALLOWED_PATHS],
  },
  sitemap: `${siteUrl}/sitemap.xml`,
});

export { buildRobots };
