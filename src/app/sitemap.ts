import type { MetadataRoute } from "next";
import { buildSitemap } from "@/sitemap";
import { getSiteUrl } from "@/utils/getSiteUrl";

const sitemap = (): MetadataRoute.Sitemap => buildSitemap(getSiteUrl());

export default sitemap;
