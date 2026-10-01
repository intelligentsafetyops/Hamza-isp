import type { MetadataRoute } from "next";
import { brand } from "@/lib/brand";

const routes = [
  "",
  "/platform",
  "/gap-assessment",
  "/book-a-demo",
  "/pricing",
  "/security",
  "/privacy",
  "/terms"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${brand.siteUrl}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.6
  }));
}
