import { Metadata } from "next";
import { Suspense } from "react";
import { CatalogClient } from "@/components/catalog-client";

export const metadata: Metadata = {
  title: "Catálogo",
  description: "Catálogo de moda com filtros persistentes na URL, busca, sort e cards de produto acessíveis.",
};

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-20">Carregando catálogo...</div>}>
      <CatalogClient />
    </Suspense>
  );
}
