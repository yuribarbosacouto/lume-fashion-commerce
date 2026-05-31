"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { cartKey, useCart } from "@/components/cart-provider";
import { formatCurrency } from "@/lib/format";

export function CheckoutClient() {
  const [cep, setCep] = useState("25555-000");
  const [submitted, setSubmitted] = useState(false);
  const { clearCart, items, subtotal } = useCart();
  const shipping = subtotal > 400 || subtotal === 0 ? 0 : 19.9;
  const discount = useMemo(() => (subtotal > 600 ? subtotal * 0.08 : 0), [subtotal]);
  const total = Math.max(0, subtotal + shipping - discount);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    clearCart();
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8a5d44]">Pedido simulado</p>
        <h1 className="mt-3 font-serif text-5xl text-stone-950">Checkout concluído sem pagamento real.</h1>
        <p className="mt-4 text-stone-600">
          Este fluxo existe para demonstrar validação de funil, resumo transparente, estados de sucesso e teste E2E.
        </p>
        <Link className="mt-8 inline-block rounded-full bg-stone-950 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white" href="/catalogo">
          Voltar ao catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8a5d44]">Checkout</p>
      <h1 className="mt-3 font-serif text-5xl tracking-tight text-stone-950">Compra em etapas claras</h1>
      <p className="mt-3 max-w-2xl text-stone-600">
        O checkout prioriza previsibilidade: identificação, entrega, pagamento e resumo sempre visíveis.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <form className="grid gap-5" onSubmit={onSubmit}>
          <StepCard number="1" title="Identificação">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nome completo" name="name" placeholder="Yuri Barbosa Couto" required />
              <Field label="E-mail" name="email" placeholder="yuri@email.com" required type="email" />
            </div>
          </StepCard>

          <StepCard number="2" title="Entrega">
            <div className="grid gap-4 sm:grid-cols-[0.7fr_1fr]">
              <Field label="CEP" name="cep" onChange={(value) => setCep(value)} placeholder="25555-000" required value={cep} />
              <div className="rounded-lg bg-[#f4eee5] p-4 text-sm text-stone-700">
                <p className="font-semibold text-stone-950">Opções para {cep}</p>
                <p className="mt-1">Entrega padrão: {shipping === 0 ? "grátis" : formatCurrency(shipping)} em 4 dias úteis.</p>
                <p>Retirada em loja parceira: grátis em 2 dias úteis.</p>
              </div>
            </div>
          </StepCard>

          <StepCard number="3" title="Pagamento">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="rounded-lg border border-stone-300 bg-white p-4">
                <input defaultChecked className="mr-2 accent-stone-950" name="payment" type="radio" />
                Cartão em até 5x sem juros
              </label>
              <label className="rounded-lg border border-stone-300 bg-white p-4">
                <input className="mr-2 accent-stone-950" name="payment" type="radio" />
                PIX com confirmação imediata
              </label>
            </div>
          </StepCard>

          <button
            className="rounded-full bg-stone-950 px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-400"
            data-testid="finish-checkout"
            disabled={items.length === 0}
            type="submit"
          >
            Finalizar pedido simulado
          </button>
        </form>

        <aside className="h-max rounded-lg border border-stone-200 bg-white p-5 lg:sticky lg:top-32">
          <h2 className="font-serif text-2xl">Resumo</h2>
          {items.length === 0 ? (
            <div className="mt-5 rounded-lg border border-dashed border-stone-300 p-5 text-sm text-stone-600">
              Sua sacola está vazia. Adicione um produto para testar o checkout.
            </div>
          ) : (
            <ul className="mt-5 space-y-4">
              {items.map((item) => (
                <li className="grid grid-cols-[64px_1fr] gap-3" key={cartKey(item)}>
                  <Image alt="" className="aspect-[3/4] rounded-md object-cover" height={86} src={item.image} style={{ height: "auto" }} width={64} />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-stone-600">{item.color} / {item.size} / Qtd. {item.quantity}</p>
                    <p className="mt-1 font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 space-y-2 border-t border-stone-200 pt-5 text-sm">
            <Line label="Subtotal" value={formatCurrency(subtotal)} />
            <Line label="Frete" value={shipping === 0 ? "Grátis" : formatCurrency(shipping)} />
            <Line label="Desconto progressivo" value={discount > 0 ? `-${formatCurrency(discount)}` : "R$ 0,00"} />
            <div className="flex items-center justify-between pt-3 text-lg font-bold">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function StepCard({ children, number, title }: { children: React.ReactNode; number: string; title: string }) {
  return (
    <section className="rounded-lg border border-stone-200 bg-white p-5">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-950 text-sm font-bold text-white">
          {number}
        </span>
        <h2 className="font-serif text-2xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  name,
  onChange,
  placeholder,
  required,
  type = "text",
  value,
}: {
  label: string;
  name: string;
  onChange?: (value: string) => void;
  placeholder: string;
  required?: boolean;
  type?: string;
  value?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-stone-700">
      {label}
      <input
        className="rounded-lg border border-stone-300 px-4 py-3 font-normal text-stone-950 outline-none focus:border-stone-950 focus:ring-2 focus:ring-stone-950/10"
        defaultValue={value}
        name={name}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        required={required}
        type={type}
      />
    </label>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
