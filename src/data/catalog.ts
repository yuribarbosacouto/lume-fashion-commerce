export type ProductColor = {
  name: string;
  hex: string;
};

export type ProductSize = {
  label: "PP" | "P" | "M" | "G" | "GG";
  chest: [number, number];
  waist: [number, number];
  hips: [number, number];
  stock: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: "Vestidos" | "Alfaiataria" | "Jeans" | "Básicos" | "Casacos";
  line: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  badge?: string;
  isNew?: boolean;
  description: string;
  material: string;
  fit: "slim" | "regular" | "oversized";
  model: string;
  care: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  images: string[];
  tags: string[];
  stockStatus: "Pronta entrega" | "Últimas unidades" | "Pré-venda";
  related: string[];
};

export const products: Product[] = [
  {
    id: "lum-001",
    slug: "vestido-midi-linho-areia",
    name: "Vestido midi em linho Areia",
    category: "Vestidos",
    line: "Resort urbano",
    price: 329.9,
    compareAt: 389.9,
    rating: 4.8,
    reviews: 86,
    badge: "Mais vendido",
    description:
      "Vestido midi com alças ajustáveis, recorte suave na cintura e caimento fresco para rotinas de trabalho, almoço e fim de semana.",
    material: "70% viscose, 30% linho certificado.",
    fit: "regular",
    model: "Modelo veste P, tem 1,74 m, busto 86 cm, cintura 68 cm e quadril 94 cm.",
    care: ["Lavar à mão", "Secar à sombra", "Passar em temperatura baixa"],
    colors: [
      { name: "Areia", hex: "#d8c7aa" },
      { name: "Preto", hex: "#191714" },
      { name: "Terracota", hex: "#9b4f38" },
    ],
    sizes: [
      { label: "PP", chest: [78, 84], waist: [60, 66], hips: [86, 92], stock: 4 },
      { label: "P", chest: [84, 90], waist: [66, 72], hips: [92, 98], stock: 11 },
      { label: "M", chest: [90, 96], waist: [72, 80], hips: [98, 106], stock: 8 },
      { label: "G", chest: [96, 104], waist: [80, 88], hips: [106, 114], stock: 3 },
      { label: "GG", chest: [104, 112], waist: [88, 96], hips: [114, 122], stock: 0 },
    ],
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=82",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=82",
    ],
    tags: ["midi", "linho", "trabalho", "verão"],
    stockStatus: "Pronta entrega",
    related: ["calca-alfaiataria-cenoura-preta", "camisa-oversized-algodao-branca"],
  },
  {
    id: "lum-002",
    slug: "calca-alfaiataria-cenoura-preta",
    name: "Calça alfaiataria cenoura Preta",
    category: "Alfaiataria",
    line: "Essenciais de escritório",
    price: 279.9,
    rating: 4.7,
    reviews: 64,
    badge: "Forma inteligente",
    description:
      "Calça de cintura alta com pregas frontais, bolso faca e tornozelo levemente afunilado para montar uniforme de trabalho sem rigidez.",
    material: "Tecido plano com viscose, elastano e toque seco.",
    fit: "regular",
    model: "Modelo veste 38, tem 1,72 m, cintura 70 cm e quadril 98 cm.",
    care: ["Lavar do avesso", "Não usar alvejante", "Pendurar em cabide"],
    colors: [
      { name: "Preto", hex: "#111111" },
      { name: "Grafite", hex: "#4d4d50" },
      { name: "Off white", hex: "#eee9df" },
    ],
    sizes: [
      { label: "PP", chest: [78, 84], waist: [58, 64], hips: [84, 90], stock: 2 },
      { label: "P", chest: [84, 90], waist: [64, 70], hips: [90, 96], stock: 7 },
      { label: "M", chest: [90, 96], waist: [70, 78], hips: [96, 104], stock: 13 },
      { label: "G", chest: [96, 104], waist: [78, 86], hips: [104, 112], stock: 5 },
      { label: "GG", chest: [104, 112], waist: [86, 94], hips: [112, 120], stock: 2 },
    ],
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=82",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=82",
    ],
    tags: ["alfaiataria", "office", "preto", "cintura alta"],
    stockStatus: "Pronta entrega",
    related: ["camisa-oversized-algodao-branca", "blazer-linho-estruturado-oliva"],
  },
  {
    id: "lum-003",
    slug: "camisa-oversized-algodao-branca",
    name: "Camisa oversized algodão Branca",
    category: "Básicos",
    line: "Camadas inteligentes",
    price: 189.9,
    rating: 4.9,
    reviews: 112,
    isNew: true,
    description:
      "Camisa de algodão com modelagem ampla, gola estruturada e barra levemente arredondada. Funciona fechada, aberta ou sobreposta.",
    material: "100% algodão com certificação BCI.",
    fit: "oversized",
    model: "Modelo veste P, tem 1,76 m, busto 88 cm e cintura 66 cm.",
    care: ["Lavar com cores similares", "Secar em superfície plana", "Passar com vapor"],
    colors: [
      { name: "Branco", hex: "#f7f4ed" },
      { name: "Azul claro", hex: "#c4d5e5" },
      { name: "Listrado", hex: "#9aa7b2" },
    ],
    sizes: [
      { label: "PP", chest: [82, 90], waist: [64, 72], hips: [88, 96], stock: 5 },
      { label: "P", chest: [90, 98], waist: [72, 80], hips: [96, 104], stock: 16 },
      { label: "M", chest: [98, 106], waist: [80, 88], hips: [104, 112], stock: 9 },
      { label: "G", chest: [106, 114], waist: [88, 96], hips: [112, 120], stock: 4 },
      { label: "GG", chest: [114, 122], waist: [96, 104], hips: [120, 128], stock: 1 },
    ],
    images: [
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=82",
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=1200&q=82",
    ],
    tags: ["algodão", "camisa", "oversized", "básico"],
    stockStatus: "Pronta entrega",
    related: ["calca-alfaiataria-cenoura-preta", "jeans-reto-azul-medio"],
  },
  {
    id: "lum-004",
    slug: "jeans-reto-azul-medio",
    name: "Jeans reto Azul médio",
    category: "Jeans",
    line: "Denim com rotina",
    price: 239.9,
    compareAt: 269.9,
    rating: 4.6,
    reviews: 48,
    description:
      "Jeans reto com cintura média, lavagem azul equilibrada e elastano discreto para sentar, caminhar e trabalhar sem perder a forma.",
    material: "98% algodão, 2% elastano.",
    fit: "regular",
    model: "Modelo veste 38, tem 1,70 m, cintura 72 cm e quadril 99 cm.",
    care: ["Lavar do avesso", "Evitar secadora", "A cor pode transferir nas primeiras lavagens"],
    colors: [
      { name: "Azul médio", hex: "#5d718e" },
      { name: "Azul escuro", hex: "#243a56" },
    ],
    sizes: [
      { label: "PP", chest: [78, 84], waist: [58, 64], hips: [84, 90], stock: 1 },
      { label: "P", chest: [84, 90], waist: [64, 70], hips: [90, 96], stock: 4 },
      { label: "M", chest: [90, 96], waist: [70, 78], hips: [96, 104], stock: 10 },
      { label: "G", chest: [96, 104], waist: [78, 86], hips: [104, 112], stock: 6 },
      { label: "GG", chest: [104, 112], waist: [86, 94], hips: [112, 120], stock: 3 },
    ],
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=82",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=82",
    ],
    tags: ["jeans", "reto", "denim", "casual"],
    stockStatus: "Últimas unidades",
    related: ["camisa-oversized-algodao-branca", "blazer-linho-estruturado-oliva"],
  },
  {
    id: "lum-005",
    slug: "blazer-linho-estruturado-oliva",
    name: "Blazer linho estruturado Oliva",
    category: "Casacos",
    line: "Tailoring leve",
    price: 449.9,
    rating: 4.8,
    reviews: 39,
    badge: "Peça-chave",
    description:
      "Blazer com ombro leve, fechamento simples e bolsos funcionais. Feito para elevar jeans, vestidos e alfaiataria sem peso visual.",
    material: "52% linho, 46% viscose, 2% elastano.",
    fit: "regular",
    model: "Modelo veste P, tem 1,75 m, busto 87 cm e cintura 67 cm.",
    care: ["Limpeza a seco preferencial", "Guardar em cabide largo", "Não torcer"],
    colors: [
      { name: "Oliva", hex: "#6a7356" },
      { name: "Marinho", hex: "#1e2d3b" },
      { name: "Cru", hex: "#e6dcc8" },
    ],
    sizes: [
      { label: "PP", chest: [78, 86], waist: [60, 68], hips: [86, 94], stock: 0 },
      { label: "P", chest: [86, 94], waist: [68, 76], hips: [94, 102], stock: 5 },
      { label: "M", chest: [94, 102], waist: [76, 84], hips: [102, 110], stock: 7 },
      { label: "G", chest: [102, 110], waist: [84, 92], hips: [110, 118], stock: 2 },
      { label: "GG", chest: [110, 118], waist: [92, 100], hips: [118, 126], stock: 0 },
    ],
    images: [
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1200&q=82",
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=1200&q=82",
    ],
    tags: ["blazer", "linho", "casaco", "office"],
    stockStatus: "Últimas unidades",
    related: ["calca-alfaiataria-cenoura-preta", "vestido-midi-linho-areia"],
  },
  {
    id: "lum-006",
    slug: "top-canelado-cafe",
    name: "Top canelado Café",
    category: "Básicos",
    line: "Base para looks",
    price: 119.9,
    rating: 4.5,
    reviews: 52,
    description:
      "Top em malha canelada com toque macio, decote quadrado e alça média. Base simples para sobreposição, jeans e alfaiataria.",
    material: "Malha canelada com algodão, modal e elastano.",
    fit: "slim",
    model: "Modelo veste P, tem 1,68 m, busto 84 cm e cintura 64 cm.",
    care: ["Lavar em ciclo delicado", "Não usar alvejante", "Secar à sombra"],
    colors: [
      { name: "Café", hex: "#5a3427" },
      { name: "Creme", hex: "#efe2cf" },
      { name: "Preto", hex: "#111111" },
    ],
    sizes: [
      { label: "PP", chest: [74, 80], waist: [56, 62], hips: [82, 88], stock: 6 },
      { label: "P", chest: [80, 86], waist: [62, 68], hips: [88, 94], stock: 9 },
      { label: "M", chest: [86, 92], waist: [68, 76], hips: [94, 102], stock: 12 },
      { label: "G", chest: [92, 100], waist: [76, 84], hips: [102, 110], stock: 5 },
      { label: "GG", chest: [100, 108], waist: [84, 92], hips: [110, 118], stock: 2 },
    ],
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=82",
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=82",
    ],
    tags: ["top", "malha", "canelado", "básico"],
    stockStatus: "Pronta entrega",
    related: ["jeans-reto-azul-medio", "blazer-linho-estruturado-oliva"],
  },
];

export const categories = ["Vestidos", "Alfaiataria", "Jeans", "Básicos", "Casacos"] as const;
export const sizes = ["PP", "P", "M", "G", "GG"] as const;
export const colors = ["Areia", "Preto", "Terracota", "Branco", "Azul médio", "Oliva", "Café"] as const;

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product) {
  return product.related
    .map((slug) => getProductBySlug(slug))
    .filter((item): item is Product => Boolean(item));
}
