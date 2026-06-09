# Lume Fashion Commerce

Projeto de produto/UX do portfolio: mostra discovery, catalogo, pagina de produto, carrinho, checkout e testes de funil. Ele complementa o OpsFlow, que e mais forte em sistema administrativo/full stack.

![CI](https://github.com/yuribarbosacouto/lume-fashion-commerce/actions/workflows/ci.yml/badge.svg)
![Pages](https://github.com/yuribarbosacouto/lume-fashion-commerce/actions/workflows/pages.yml/badge.svg)
![CodeQL](https://github.com/yuribarbosacouto/lume-fashion-commerce/actions/workflows/codeql.yml/badge.svg)

E-commerce de moda UX-first para demonstrar discovery, PLP com filtros compartilháveis, PDP clara, guia de medidas, carrinho, checkout e qualidade técnica.

[Demo online](https://yuribarbosacouto.github.io/lume-fashion-commerce/) · [Portfólio](https://yuribarbosacouto.github.io/yuri-dev-portfolio/) · [GitHub](https://github.com/yuribarbosacouto)

## Problema

Comprar roupa online tem fricções específicas: descobrir rápido, entender tecido e caimento, confiar na troca, escolher tamanho e finalizar sem surpresa. O Lume transforma essa dor em um work sample de produto: interface editorial com regras de negócio visíveis e fluxo crítico testado.

## Funcionalidades

- Home editorial com blocos de confiança e atalhos de categoria.
- Busca acessível com sugestões e instruções para tecnologia assistiva.
- PLP com filtros de categoria, cor, tamanho, sort e estado persistido na URL.
- PDP com galeria, swatches, estoque, guia de medidas, recomendação de tamanho e JSON-LD `Product`.
- Carrinho persistente em `localStorage`, drawer acessível e checkout em etapas.
- Regras simples de frete, desconto progressivo e recomendação "complete o look".
- Static export para GitHub Pages.

## Stack

- Next.js App Router, TypeScript, React 19.
- Tailwind CSS 4 com tokens em CSS variables.
- Playwright para fluxo crítico em desktop e mobile.
- GitHub Actions para typecheck, lint, audit, build, E2E, Pages e CodeQL.

## Qualidade

```bash
npm run typecheck
npm run lint
npm run audit
npm run build
npm run test:e2e
```

O projeto usa override de `postcss` para manter `npm audit --audit-level=moderate` sem alertas enquanto preserva Next.js 16.

## Governanca

- Guia de contribuicao: [CONTRIBUTING.md](CONTRIBUTING.md)
- Politica de seguranca: [SECURITY.md](SECURITY.md)
- Templates de issue e pull request em [`.github`](.github)

## Como rodar

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Decisões de produto

- Filtros em URL para mostrar maturidade de catálogo e permitir links compartilháveis.
- Guia de medidas com lógica transparente em vez de "IA" decorativa.
- Checkout sem pagamento real para focar em UX, estado, resumo e teste de funil.
- Dados mockados versionados no MVP para acelerar entrega e manter deploy estático.

## Roadmap

- Wishlist e alerta de volta ao estoque.
- Dashboard simples de eventos de busca, filtro e add-to-cart.
- Experiment flag para testar ordem de blocos da PDP.
- Lighthouse CI com orçamento de performance.
- Integração posterior com headless CMS ou banco SQL.
