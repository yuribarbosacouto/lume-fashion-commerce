import { MetadataRoute } from "next";
import { products } from "@/data/catalog";

const baseUrl = "https://yuribarbosacouto.github.io/lume-fashion-commerce";
const lastModified = new Date("2026-05-30");

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/`,
      lastModified,
    },
    {
      url: `${baseUrl}/catalogo/`,
      lastModified,
    },
    {
      url: `${baseUrl}/checkout/`,
      lastModified,
    },
    ...products.map((product) => ({
      url: `${baseUrl}/produto/${product.slug}/`,
      lastModified,
    })),
  ];
}
