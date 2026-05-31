"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { products } from "@/data/catalog";

export function SearchCombobox() {
  const [query, setQuery] = useState("");
  const suggestions = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (value.length < 2) return [];

    return products
      .filter((product) =>
        [product.name, product.category, product.line, ...product.tags].join(" ").toLowerCase().includes(value),
      )
      .slice(0, 5);
  }, [query]);

  const expanded = suggestions.length > 0;

  return (
    <div
      aria-controls="search-list"
      aria-expanded={expanded}
      aria-haspopup="listbox"
      className="relative w-full max-w-sm"
      role="combobox"
    >
      <label className="sr-only" htmlFor="site-search">
        Buscar produtos
      </label>
      <input
        aria-autocomplete="list"
        aria-controls="search-list"
        aria-describedby="search-help"
        className="h-11 w-full rounded-full border border-stone-300 bg-white px-4 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-stone-950 focus:ring-2 focus:ring-stone-950/10"
        id="site-search"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Buscar vestido, jeans, oversized..."
        type="search"
        value={query}
      />
      <p className="sr-only" id="search-help">
        Digite para buscar, use Tab para navegar entre sugestões e Enter para abrir.
      </p>

      {expanded ? (
        <ul
          className="absolute left-0 right-0 top-13 z-30 rounded-xl border border-stone-200 bg-white p-2 shadow-xl"
          id="search-list"
          role="listbox"
        >
          {suggestions.map((product, index) => (
            <li aria-selected="false" key={product.slug} role="option" id={`search-option-${index}`}>
              <Link
                className="block rounded-lg px-3 py-2 text-sm text-stone-700 hover:bg-stone-100 hover:text-stone-950"
                href={`/produto/${product.slug}`}
                onClick={() => setQuery("")}
              >
                <span className="block font-semibold">{product.name}</span>
                <span className="text-xs text-stone-500">{product.category} - {product.line}</span>
              </Link>
            </li>
          ))}
          <li aria-selected="false" role="option">
            <Link
              className="mt-1 block rounded-lg bg-stone-950 px-3 py-2 text-center text-xs font-bold uppercase tracking-[0.16em] text-white"
              href={`/catalogo?q=${encodeURIComponent(query)}`}
              onClick={() => setQuery("")}
            >
              Ver resultados
            </Link>
          </li>
        </ul>
      ) : null}
    </div>
  );
}
