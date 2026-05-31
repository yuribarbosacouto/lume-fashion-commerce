import Link from "next/link";
import { CartDrawer } from "@/components/cart-drawer";
import { SearchCombobox } from "@/components/search-combobox";

const navItems = [
  { label: "Novidades", href: "/catalogo?sort=new-in" },
  { label: "Vestidos", href: "/catalogo?category=Vestidos" },
  { label: "Alfaiataria", href: "/catalogo?category=Alfaiataria" },
  { label: "Jeans", href: "/catalogo?category=Jeans" },
  { label: "Sale", href: "/catalogo?sort=price-asc" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-[#faf8f3]/95 backdrop-blur">
      <a className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:p-3" href="#conteudo">
        Pular para o conteúdo
      </a>
      <div className="border-b border-stone-200 bg-stone-950 px-4 py-2 text-center text-xs font-medium text-white">
        Troca grátis em até 30 dias. PIX com aprovação instantânea. Retirada simulada por CEP no checkout.
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link className="font-serif text-3xl tracking-tight text-stone-950" href="/">
            Lume
          </Link>
        </div>

        <nav aria-label="Categorias principais" className="order-3 flex gap-1 overflow-x-auto lg:order-none lg:gap-2">
          {navItems.map((item) => (
            <Link
              className="rounded-full px-3 py-2 text-sm font-semibold text-stone-700 transition hover:bg-white hover:text-stone-950"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <SearchCombobox />
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}
