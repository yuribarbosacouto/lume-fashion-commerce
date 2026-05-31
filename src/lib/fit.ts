import { Product, ProductSize } from "@/data/catalog";

export type BodyProfile = {
  heightCm: number;
  chestCm: number;
  waistCm: number;
  hipsCm: number;
  preferredFit: Product["fit"];
};

export function recommendSize(profile: BodyProfile, sizes: ProductSize[]) {
  const availableSizes = sizes.filter((size) => size.stock > 0);
  const exact = availableSizes.find((size) => {
    const chest = inRange(profile.chestCm, size.chest);
    const waist = inRange(profile.waistCm, size.waist);
    const hips = inRange(profile.hipsCm, size.hips);
    return chest && waist && hips;
  });

  if (exact) return exact;

  return availableSizes
    .map((size) => ({
      size,
      score:
        distance(profile.chestCm, size.chest) +
        distance(profile.waistCm, size.waist) +
        distance(profile.hipsCm, size.hips),
    }))
    .sort((a, b) => a.score - b.score)[0]?.size;
}

function inRange(value: number, range: [number, number]) {
  return value >= range[0] && value <= range[1];
}

function distance(value: number, range: [number, number]) {
  if (value < range[0]) return range[0] - value;
  if (value > range[1]) return value - range[1];
  return 0;
}
