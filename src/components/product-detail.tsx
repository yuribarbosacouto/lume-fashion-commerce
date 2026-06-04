"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart-provider";
import { ProductCard } from "@/components/product-card";
import { Product, ProductSize } from "@/data/catalog";
import { BodyProfile, recommendSize } from "@/lib/fit";
import { formatCurrency, installmentLabel } from "@/lib/format";

export function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const [image, setImage] = useState(product.images[0]);
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState(product.sizes.find((item) => item.stock > 0)?.label ?? product.sizes[0].label);
  const [profile, setProfile] = useState<BodyProfile>({
    heightCm: 172,
    chestCm: 88,
    waistCm: 70,
    hipsCm: 98,
    preferredFit: product.fit,
  });
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const selectedSize = product.sizes.find((item) => item.label === size);
  const recommended = useMemo(() => recommendSize(profile, product.sizes), [profile, product.sizes]);

  function handleAddToCart() {
    if (!selectedSize || selectedSize.stock === 0) return;
    addItem({ product, color, size });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2600);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <nav aria-label="Breadcrumb" className="text-sm text-stone-500">
        <Link className="underline-offset-4 hover:text-stone-950 hover:underline" href="/">
          Início
        </Link>
        <span aria-hidden="true"> / </span>
        <Link className="underline-offset-4 hover:text-stone-950 hover:underline" href="/catalogo">
          Catálogo
        </Link>
        <span aria-hidden="true"> / </span>
        <span>{product.name}</span>
      </nav>

      <section className="mt-8 grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="grid gap-4 lg:grid-cols-[92px_1fr]">
          <div className="order-2 flex gap-3 lg:order-1 lg:flex-col">
            {product.images.map((item) => (
              <button
                aria-label={`Ver imagem de ${product.name}`}
                className={`relative h-[120px] w-[90px] shrink-0 overflow-hidden rounded-md border ${
                  image === item ? "border-stone-950" : "border-stone-200"
                }`}
                key={item}
                onClick={() => setImage(item)}
                type="button"
              >
                <Image alt="" className="object-cover" fill sizes="90px" src={item} />
              </button>
            ))}
          </div>
          <div className="relative order-1 aspect-[3/4] overflow-hidden rounded-lg bg-stone-100 lg:order-2">
            <Image
              alt={`Modelo usando ${product.name}`}
              className="object-cover"
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              src={image}
            />
          </div>
        </div>

        <div className="lg:sticky lg:top-32 lg:h-max">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8a5d44]">{product.line}</p>
          <h1 className="mt-3 font-serif text-5xl leading-tight tracking-tight text-stone-950">{product.name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <p className="text-2xl font-semibold text-stone-950">{formatCurrency(product.price)}</p>
            {product.compareAt ? <p className="text-stone-500 line-through">{formatCurrency(product.compareAt)}</p> : null}
            <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-stone-700">
              {installmentLabel(product.price)}
            </span>
          </div>
          <p className="mt-4 leading-7 text-stone-600">{product.description}</p>

          <div className="mt-6 rounded-lg border border-stone-200 bg-white p-5">
            <div className="flex items-center justify-between gap-4">
              <p className="font-semibold">Cor: {color}</p>
              <p className="text-sm text-stone-500">{product.stockStatus}</p>
            </div>
            <div className="mt-3 flex gap-2">
              {product.colors.map((item) => (
                <button
                  aria-label={`Selecionar cor ${item.name}`}
                  className={`h-9 w-9 rounded-full border-2 ${color === item.name ? "border-stone-950" : "border-white"} shadow ring-1 ring-stone-300`}
                  key={item.name}
                  onClick={() => setColor(item.name)}
                  style={{ backgroundColor: item.hex }}
                  type="button"
                />
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <p className="font-semibold">Tamanho</p>
              <a className="text-sm font-semibold text-stone-600 underline-offset-4 hover:text-stone-950 hover:underline" href="#guia-medidas">
                Abrir guia de medidas
              </a>
            </div>
            <div className="mt-3 grid grid-cols-5 gap-2" role="radiogroup" aria-label="Escolha um tamanho">
              {product.sizes.map((item) => (
                <button
                  aria-checked={size === item.label}
                  className={`rounded-md border px-3 py-3 text-sm font-semibold transition ${
                    size === item.label ? "border-stone-950 bg-stone-950 text-white" : "border-stone-300 bg-white text-stone-950"
                  } ${item.stock === 0 ? "cursor-not-allowed opacity-40" : "hover:border-stone-950"}`}
                  disabled={item.stock === 0}
                  key={item.label}
                  onClick={() => setSize(item.label)}
                  role="radio"
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </div>
            {recommended ? (
              <p className="mt-3 rounded-md bg-[#f4eee5] px-3 py-2 text-sm text-stone-700">
                Recomendação pelo perfil preenchido: tamanho <strong>{recommended.label}</strong>.
              </p>
            ) : null}

            <button
              className="mt-6 w-full rounded-full bg-stone-950 px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-400"
              data-testid="add-to-cart"
              disabled={!selectedSize || selectedSize.stock === 0}
              onClick={handleAddToCart}
              type="button"
            >
              Adicionar à sacola
            </button>
            {added ? (
              <p className="mt-3 rounded-md bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800" role="status">
                Produto adicionado à sacola.
              </p>
            ) : null}
          </div>

          <TrustPanel />
        </div>
      </section>

      <section className="mt-16 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]" id="guia-medidas">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8a5d44]">Fit finder</p>
          <h2 className="mt-3 font-serif text-4xl tracking-tight">Guia de medidas útil de verdade</h2>
          <p className="mt-3 leading-7 text-stone-600">
            A recomendação não finge IA: ela mostra uma regra clara de produto, compara corpo e peça, e reduz dúvida antes do carrinho.
          </p>
          <div className="mt-5 grid gap-3">
            <MeasurementInput label="Altura" max={210} min={140} onChange={(value) => setProfile((current) => ({ ...current, heightCm: value }))} value={profile.heightCm} />
            <MeasurementInput label="Busto" max={130} min={70} onChange={(value) => setProfile((current) => ({ ...current, chestCm: value }))} value={profile.chestCm} />
            <MeasurementInput label="Cintura" max={120} min={50} onChange={(value) => setProfile((current) => ({ ...current, waistCm: value }))} value={profile.waistCm} />
            <MeasurementInput label="Quadril" max={140} min={80} onChange={(value) => setProfile((current) => ({ ...current, hipsCm: value }))} value={profile.hipsCm} />
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-stone-200 bg-white">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Tabela de medidas da peça</caption>
            <thead className="bg-stone-100 text-stone-700">
              <tr>
                <th className="px-4 py-3">Tamanho</th>
                <th className="px-4 py-3">Busto</th>
                <th className="px-4 py-3">Cintura</th>
                <th className="px-4 py-3">Quadril</th>
                <th className="px-4 py-3">Estoque</th>
              </tr>
            </thead>
            <tbody>
              {product.sizes.map((item) => (
                <SizeRow key={item.label} recommended={recommended?.label === item.label} size={item} />
              ))}
            </tbody>
          </table>
          <div className="border-t border-stone-200 p-5 text-sm leading-6 text-stone-600">
            <p><strong>Material:</strong> {product.material}</p>
            <p className="mt-2"><strong>Modelo:</strong> {product.model}</p>
          </div>
        </div>
      </section>

      <section className="mt-16 border-t border-stone-200 py-12">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8a5d44]">Complete o look</p>
            <h2 className="mt-3 font-serif text-4xl tracking-tight">Recomendação por regra de negócio</h2>
          </div>
          <Link className="text-sm font-bold uppercase tracking-[0.18em] underline-offset-4 hover:underline" href="/catalogo">
            Voltar ao catálogo
          </Link>
        </div>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

function MeasurementInput({
  label,
  max,
  min,
  onChange,
  value,
}: {
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  value: number;
}) {
  return (
    <label className="grid gap-2 rounded-lg border border-stone-200 bg-white p-4">
      <span className="flex items-center justify-between text-sm font-semibold">
        {label}
        <span>{value} cm</span>
      </span>
      <input
        max={max}
        min={min}
        onChange={(event) => onChange(Number(event.target.value))}
        type="range"
        value={value}
      />
    </label>
  );
}

function SizeRow({ recommended, size }: { recommended: boolean; size: ProductSize }) {
  return (
    <tr className={recommended ? "bg-[#f4eee5]" : "border-t border-stone-100"}>
      <td className="px-4 py-3 font-semibold">{size.label}</td>
      <td className="px-4 py-3">{size.chest[0]}-{size.chest[1]} cm</td>
      <td className="px-4 py-3">{size.waist[0]}-{size.waist[1]} cm</td>
      <td className="px-4 py-3">{size.hips[0]}-{size.hips[1]} cm</td>
      <td className="px-4 py-3">{size.stock > 0 ? `${size.stock} un.` : "Indisponível"}</td>
    </tr>
  );
}

function TrustPanel() {
  return (
    <div className="mt-5 grid gap-3">
      {[
        ["Entrega", "Calcule no checkout com CEP simulado e opção de retirada."],
        ["Troca", "30 dias para trocar com instruções visíveis antes da compra."],
        ["Pagamento", "PIX e cartão em até 5x sem juros no protótipo."],
      ].map(([title, text]) => (
        <details className="rounded-lg border border-stone-200 bg-white p-4" key={title}>
          <summary className="cursor-pointer font-semibold">{title}</summary>
          <p className="mt-2 text-sm leading-6 text-stone-600">{text}</p>
        </details>
      ))}
    </div>
  );
}
