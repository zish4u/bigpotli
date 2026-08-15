import { OG_IMAGE_SIZE, renderBrandOgImage } from "@/lib/ogImage";

export const alt = "Bigpotli – Abayas, Hijabs & Ethnic Wear in Bihar";
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default function TwitterImage() {
  return renderBrandOgImage();
}
