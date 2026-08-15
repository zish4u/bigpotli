import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  const logoBuffer = readFileSync(join(process.cwd(), "public", "logo_old.jpg"));
  const logoBase64 = `data:image/jpeg;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <img
        src={logoBase64}
        width={size.width}
        height={size.height}
        style={{ borderRadius: "50%" }}
      />
    ),
    { ...size }
  );
}
