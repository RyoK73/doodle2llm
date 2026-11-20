import type { MetadataRoute } from "next";
import { buildRobots } from "@/robots";
import { getSiteUrl } from "@/utils/getSiteUrl";

const robots = (): MetadataRoute.Robots => buildRobots(getSiteUrl());

export default robots;
