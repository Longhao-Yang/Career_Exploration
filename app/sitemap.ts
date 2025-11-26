import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "http://localhost:3000";
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/careers/frontend-engineer`, lastModified: new Date() },
    { url: `${base}/careers/frontend-engineer/experience`, lastModified: new Date() },
    { url: `${base}/careers/frontend-engineer/kit`, lastModified: new Date() }
  ];
}
