import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { CartProvider } from "@/components/cart-provider";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Lume Fashion Commerce | E-commerce UX-first",
    template: "%s | Lume",
  },
  description:
    "E-commerce de moda focado em descoberta rápida, PDP clara, guia de medidas, carrinho sem atrito, SEO e acessibilidade.",
  metadataBase: new URL("https://yuribarbosacouto.github.io/lume-fashion-commerce/"),
  openGraph: {
    title: "Lume Fashion Commerce",
    description: "Projeto de portfólio Next.js com UX, performance, SEO e testes de funil crítico.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`} data-scroll-behavior="smooth">
      <body className="min-h-screen bg-[#faf8f3] text-stone-950 antialiased">
        <CartProvider>
          <SiteHeader />
          <main id="conteudo">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
