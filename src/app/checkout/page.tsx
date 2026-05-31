import { Metadata } from "next";
import { CheckoutClient } from "@/components/checkout-client";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Checkout simulado em etapas, com resumo de sacola, frete, desconto progressivo e pagamento sem atrito.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
