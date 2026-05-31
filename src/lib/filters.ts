import { Product } from "@/data/catalog";

export type CatalogFilters = {
  q?: string;
  category?: string[];
  color?: string[];
  size?: string[];
  sort?: "relevance" | "price-asc" | "price-desc" | "new-in";
};

export function readFilters(searchParams: URLSearchParams): CatalogFilters {
  return {
    q: searchParams.get("q") || undefined,
    category: searchParams.getAll("category"),
    color: searchParams.getAll("color"),
    size: searchParams.getAll("size"),
    sort: (searchParams.get("sort") as CatalogFilters["sort"]) || "relevance",
  };
}

export function filterProducts(products: Product[], filters: CatalogFilters) {
  const query = filters.q?.trim().toLowerCase();
  const filtered = products.filter((product) => {
    const matchesQuery =
      !query ||
      [product.name, product.category, product.line, product.description, ...product.tags]
        .join(" ")
        .toLowerCase()
        .includes(query);

    const matchesCategory = !filters.category?.length || filters.category.includes(product.category);
    const matchesColor =
      !filters.color?.length || product.colors.some((color) => filters.color?.includes(color.name));
    const matchesSize =
      !filters.size?.length ||
      product.sizes.some((size) => filters.size?.includes(size.label) && size.stock > 0);

    return matchesQuery && matchesCategory && matchesColor && matchesSize;
  });

  return [...filtered].sort((a, b) => {
    if (filters.sort === "price-asc") return a.price - b.price;
    if (filters.sort === "price-desc") return b.price - a.price;
    if (filters.sort === "new-in") return Number(Boolean(b.isNew)) - Number(Boolean(a.isNew));
    return Number(Boolean(b.badge)) - Number(Boolean(a.badge)) || b.rating - a.rating;
  });
}

export function toggleQueryValue(params: URLSearchParams, key: string, value: string) {
  const next = new URLSearchParams(params.toString());
  const current = next.getAll(key);
  next.delete(key);

  const values = current.includes(value)
    ? current.filter((item) => item !== value)
    : [...current, value];

  values.forEach((item) => next.append(key, item));
  next.delete("page");
  return next;
}

export function removeQueryValue(params: URLSearchParams, key: string, value?: string) {
  const next = new URLSearchParams(params.toString());
  if (!value) {
    next.delete(key);
    return next;
  }

  const values = next.getAll(key).filter((item) => item !== value);
  next.delete(key);
  values.forEach((item) => next.append(key, item));
  return next;
}
