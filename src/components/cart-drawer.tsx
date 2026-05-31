"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cartKey, useCart } from "@/components/cart-provider";
import { formatCurrency, installmentLabel } from "@/lib/format";

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { items, itemCount, subtotal, removeItem, updateQuantity } = useCart();

  return (
    <>
      <button
        className="relative rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-950 transition hover:border-stone-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-950"
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        Sacola
        {itemCount > 0 ? (
          <span className="ml-2 rounded-full bg-stone-950 px-2 py-0.5 text-xs text-white" data-testid="cart-count">
            {itemCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50" role="presentation">
          <button
            aria-label="Fechar sacola"
            className="absolute inset-0 bg-stone-950/35"
            type="button"
            onClick={() => setOpen(false)}
          />
          <aside
            aria-modal="true"
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#faf8f3] shadow-2xl"
            role="dialog"
          >
            <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">Sacola</p>
                <h2 className="font-serif text-2xl text-stone-950">{itemCount} item(ns)</h2>
              </div>
              <button
                className="rounded-full border border-stone-300 px-3 py-1.5 text-sm font-semibold"
                type="button"
                onClick={() => setOpen(false)}
              >
                Fechar
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <div className="rounded-lg border border-dashed border-stone-300 p-6 text-sm text-stone-600">
                  Sua sacola está vazia. Explore os best-sellers e monte um look completo.
                </div>
              ) : (
                <ul className="space-y-5">
                  {items.map((item) => {
                    const key = cartKey(item);
                    return (
                      <li className="grid grid-cols-[88px_1fr] gap-4" key={key}>
                        <Image
                          alt=""
                          className="aspect-[3/4] rounded-md object-cover"
                          height={120}
                          src={item.image}
                          style={{ height: "auto" }}
                          width={90}
                        />
                        <div>
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-semibold text-stone-950">{item.name}</p>
                              <p className="mt-1 text-sm text-stone-600">
                                {item.color} / {item.size}
                              </p>
                            </div>
                            <button
                              className="text-sm font-semibold text-stone-500 underline-offset-4 hover:text-stone-950 hover:underline"
                              type="button"
                              onClick={() => removeItem(key)}
                            >
                              Remover
                            </button>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center rounded-full border border-stone-300">
                              <button className="px-3 py-1" type="button" onClick={() => updateQuantity(key, item.quantity - 1)}>
                                -
                              </button>
                              <span className="min-w-8 text-center text-sm">{item.quantity}</span>
                              <button className="px-3 py-1" type="button" onClick={() => updateQuantity(key, item.quantity + 1)}>
                                +
                              </button>
                            </div>
                            <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="border-t border-stone-200 px-6 py-5">
              <div className="flex items-center justify-between text-base font-semibold">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <p className="mt-1 text-sm text-stone-600">{subtotal > 0 ? installmentLabel(subtotal) : "Frete calculado no checkout."}</p>
              <Link
                className="mt-4 block rounded-full bg-stone-950 px-5 py-3 text-center text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-stone-800"
                href="/checkout"
                onClick={() => setOpen(false)}
              >
                Ir para checkout
              </Link>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
