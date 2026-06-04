import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/catalog";
import { formatCurrency, installmentLabel } from "@/lib/format";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const discount = product.compareAt ? Math.round((1 - product.price / product.compareAt) * 100) : 0;

  return (
    <article className="group" data-testid="product-card">
      <Link aria-label={`Ver produto ${product.name}`} className="block" href={`/produto/${product.slug}`}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-stone-100">
          <Image
            alt={`Modelo usando ${product.name}`}
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            fill
            priority={priority}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            src={product.images[0]}
          />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {product.badge ? (
              <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-stone-950 shadow">
                {product.badge}
              </span>
            ) : null}
            {discount > 0 ? (
              <span className="rounded-full bg-[#9b2f24] px-3 py-1 text-xs font-bold text-white">
                -{discount}%
              </span>
            ) : null}
          </div>
        </div>
      </Link>

      <div className="mt-3 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">{product.category}</p>
          <Link className="mt-1 block font-semibold text-stone-950 underline-offset-4 hover:underline" href={`/produto/${product.slug}`}>
            {product.name}
          </Link>
          <div className="mt-2 flex gap-1" aria-label={`Cores disponíveis: ${product.colors.map((color) => color.name).join(", ")}`}>
            {product.colors.map((color) => (
              <span
                className="h-4 w-4 rounded-full border border-stone-300"
                key={color.name}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>
        <div className="text-right">
          {product.compareAt ? (
            <p className="text-sm text-stone-500 line-through">{formatCurrency(product.compareAt)}</p>
          ) : null}
          <p className="font-semibold text-stone-950">{formatCurrency(product.price)}</p>
          <p className="mt-1 text-xs text-stone-500">{installmentLabel(product.price)}</p>
        </div>
      </div>
    </article>
  );
}
