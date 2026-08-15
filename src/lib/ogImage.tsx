import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

export function renderBrandOgImage() {
  const logoBuffer = readFileSync(join(process.cwd(), "public", "logo_old.jpg"));
  const logoBase64 = `data:image/jpeg;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "linear-gradient(135deg, #FAF7F2 0%, #F1CBC4 100%)",
        }}
      >
        <img
          src={logoBase64}
          width={220}
          height={220}
          style={{ borderRadius: "50%", marginBottom: 36 }}
        />
        <div style={{ fontSize: 84, fontWeight: 700, color: "#8C1A1C" }}>
          Bigpotli
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#7A5854",
            marginTop: 16,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Abayas · Hijabs · Ethnic Wear
        </div>
      </div>
    ),
    { ...OG_IMAGE_SIZE }
  );
}
