"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { ProductCard } from "@/components/product-card";
import { categories, colors, products, sizes } from "@/data/catalog";
import { filterProducts, readFilters, removeQueryValue, toggleQueryValue } from "@/lib/filters";

export function CatalogClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filters = useMemo(() => readFilters(searchParams), [searchParams]);
  const results = useMemo(() => filterProducts(products, filters), [filters]);
  const activeFilters: Array<{ key: string; value?: string; label: string }> = [
    ...(filters.q ? [{ key: "q", label: `Busca: ${filters.q}` }] : []),
    ...(filters.category ?? []).map((value) => ({ key: "category", value, label: value })),
    ...(filters.color ?? []).map((value) => ({ key: "color", value, label: value })),
    ...(filters.size ?? []).map((value) => ({ key: "size", value, label: value })),
  ];

  function push(next: URLSearchParams) {
    const query = next.toString();
    router.replace(query ? `/catalogo?${query}` : "/catalogo", { scroll: false });
  }

  function onSearch(formData: FormData) {
    const next = new URLSearchParams(searchParams.toString());
    const q = String(formData.get("q") ?? "").trim();
    if (q) next.set("q", q);
    else next.delete("q");
    push(next);
  }

  function setSort(value: string) {
    const next = new URLSearchParams(searchParams.toString());
    next.set("sort", value);
    push(next);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="flex flex-col gap-6 border-b border-stone-200 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8a5d44]">Catálogo</p>
          <h1 className="mt-3 font-serif text-5xl tracking-tight text-stone-950">Coleção navegável</h1>
          <p className="mt-3 max-w-2xl text-stone-600">
            Filtros persistem na URL, então qualquer combinação pode ser compartilhada com recrutadores ou testada em E2E.
          </p>
        </div>
        <form action={onSearch} className="flex w-full max-w-md gap-2">
          <label className="sr-only" htmlFor="catalog-search">
            Buscar no catálogo
          </label>
          <input
            className="min-w-0 flex-1 rounded-full border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-stone-950 focus:ring-2 focus:ring-stone-950/10"
            defaultValue={filters.q ?? ""}
            id="catalog-search"
            name="q"
            placeholder="Buscar por tecido, peça ou ocasião"
            type="search"
          />
          <button className="rounded-full bg-stone-950 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white" type="submit">
            Buscar
          </button>
        </form>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="h-max rounded-lg border border-stone-200 bg-white p-5 lg:sticky lg:top-32">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-serif text-2xl">Filtros</h2>
            <Link className="text-sm font-semibold text-stone-500 underline-offset-4 hover:text-stone-950 hover:underline" href="/catalogo">
              Limpar
            </Link>
          </div>
          <FilterGroup
            current={filters.category ?? []}
            label="Categoria"
            name="category"
            onToggle={(key, value) => push(toggleQueryValue(searchParams, key, value))}
            values={[...categories]}
          />
          <FilterGroup
            current={filters.size ?? []}
            label="Tamanho"
            name="size"
            onToggle={(key, value) => push(toggleQueryValue(searchParams, key, value))}
            values={[...sizes]}
          />
          <FilterGroup
            current={filters.color ?? []}
            label="Cor"
            name="color"
            onToggle={(key, value) => push(toggleQueryValue(searchParams, key, value))}
            values={[...colors]}
          />
        </aside>

        <section aria-label="Produtos filtrados">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-stone-950">
                {results.length} produto(s) encontrados
              </p>
              {activeFilters.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2" aria-label="Filtros ativos">
                  {activeFilters.map((filter) => (
                    <button
                      className="rounded-full border border-stone-300 bg-white px-3 py-1.5 text-sm text-stone-700"
                      key={`${filter.key}-${filter.label}`}
                      onClick={() => push(removeQueryValue(searchParams, filter.key, filter.value))}
                      type="button"
                    >
                      {filter.label} x
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <label className="flex items-center gap-3 text-sm font-semibold">
              Ordenar
              <select
                className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm"
                onChange={(event) => setSort(event.target.value)}
                value={filters.sort ?? "relevance"}
              >
                <option value="relevance">Relevância</option>
                <option value="new-in">Novidades</option>
                <option value="price-asc">Menor preço</option>
                <option value="price-desc">Maior preço</option>
              </select>
            </label>
          </div>

          {results.length === 0 ? (
            <div className="mt-8 rounded-lg border border-dashed border-stone-300 bg-white p-8 text-center">
              <h2 className="font-serif text-3xl text-stone-950">Nenhuma peça encontrada</h2>
              <p className="mt-2 text-stone-600">Tente remover filtros ou buscar por outra ocasião.</p>
              <Link className="mt-5 inline-block rounded-full bg-stone-950 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white" href="/catalogo">
                Limpar filtros
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((product, index) => (
                <ProductCard key={product.slug} product={product} priority={index < 2} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function FilterGroup({
  current,
  label,
  name,
  onToggle,
  values,
}: {
  current: string[];
  label: string;
  name: string;
  onToggle: (name: string, value: string) => void;
  values: string[];
}) {
  return (
    <fieldset className="mt-6 border-t border-stone-200 pt-5">
      <legend className="font-semibold text-stone-950">{label}</legend>
      <div className="mt-3 grid gap-2">
        {values.map((value) => (
          <label className="flex cursor-pointer items-center gap-3 text-sm text-stone-700" key={value}>
            <input
              checked={current.includes(value)}
              className="h-4 w-4 accent-stone-950"
              onChange={() => onToggle(name, value)}
              type="checkbox"
            />
            {value}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
