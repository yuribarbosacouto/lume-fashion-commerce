import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { products } from "@/data/catalog";

const featuredProducts = products.slice(0, 4);

export default function Home() {
  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
        <div className="relative min-h-[560px] overflow-hidden rounded-lg bg-stone-900 text-white">
          <Image
            alt="Editorial de moda com peças neutras e alfaiataria leve"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
            height={1200}
            priority
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=84"
            width={1400}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
          <div className="relative flex h-full flex-col justify-end p-6 sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-stone-100">Coleção cápsula</p>
            <h1 className="mt-4 max-w-2xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl">
              Moda pensada para reduzir dúvida antes da compra.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-stone-100">
              Catálogo editorial com filtros compartilháveis, PDP com medidas reais, guia de fit e checkout sem atrito.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-stone-950" href="/catalogo">
                Comprar coleção
              </Link>
              <Link className="rounded-full border border-white/60 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white" href="/produto/vestido-midi-linho-areia">
                Ver PDP modelo
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <FeatureCard
            eyebrow="UX de varejo"
            href="/catalogo?category=Alfaiataria"
            image="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=82"
            title="Descoberta rápida com filtros na URL"
          />
          <FeatureCard
            eyebrow="PDP forte"
            href="/produto/camisa-oversized-algodao-branca"
            image="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=1200&q=82"
            title="Guia de medidas e recomendação de tamanho"
          />
        </div>
      </section>

      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 text-sm text-stone-700 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <TrustItem title="Troca sem fricção" text="30 dias para devolver ou trocar, com regras claras no produto." />
          <TrustItem title="PIX e cartão" text="Pagamento simulado com resumo transparente de parcelas." />
          <TrustItem title="Fit antes do carrinho" text="Medidas do corpo, peça e modelo na mesma decisão." />
          <TrustItem title="Acessível por teclado" text="Busca, filtros, carrinho e checkout pensados para navegação real." />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8a5d44]">Best-sellers</p>
            <h2 className="mt-3 font-serif text-4xl tracking-tight text-stone-950">Peças com menos incerteza</h2>
          </div>
          <Link className="text-sm font-bold uppercase tracking-[0.18em] text-stone-950 underline-offset-4 hover:underline" href="/catalogo">
            Ver catálogo completo
          </Link>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.slug} product={product} priority={index < 2} />
          ))}
        </div>
      </section>

      <section className="bg-stone-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-stone-300">Case técnico</p>
            <h2 className="mt-3 font-serif text-4xl tracking-tight">O que este projeto demonstra</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "URL-state em filtros, busca e ordenação",
              "PDP com JSON-LD, trust block e recomendação de tamanho",
              "Carrinho persistente e checkout em etapas",
              "Testes E2E e pipeline com audit, lint, build e Playwright",
            ].map((item) => (
              <div className="rounded-lg border border-white/15 p-5" key={item}>
                <p className="font-semibold leading-6">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function FeatureCard({ eyebrow, href, image, title }: { eyebrow: string; href: string; image: string; title: string }) {
  return (
    <Link className="group relative min-h-[267px] overflow-hidden rounded-lg bg-stone-900 text-white" href={href}>
      <Image
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-500 group-hover:scale-[1.03]"
        height={720}
        src={image}
        width={900}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 to-stone-950/10" />
      <div className="relative flex h-full flex-col justify-end p-6">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-stone-200">{eyebrow}</p>
        <h2 className="mt-3 font-serif text-3xl leading-tight">{title}</h2>
      </div>
    </Link>
  );
}

function TrustItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-lg border border-stone-200 bg-[#faf8f3] p-4">
      <p className="font-semibold text-stone-950">{title}</p>
      <p className="mt-1 leading-6">{text}</p>
    </div>
  );
}
