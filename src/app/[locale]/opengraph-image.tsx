import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MIHI's — Digitale Agentur";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background:
            "linear-gradient(135deg, #0b0b12 0%, #1a1030 45%, #2a1848 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.75, marginBottom: 24 }}>
          Brand. Build. Scale.
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
          MIHI&apos;s
        </div>
        <div style={{ fontSize: 32, marginTop: 28, maxWidth: 800, opacity: 0.9 }}>
          Digitale Agentur für Web, E-Commerce & Automatisierung
        </div>
      </div>
    ),
    { ...size },
  );
}
