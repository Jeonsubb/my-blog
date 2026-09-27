import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "전섭의 블로그";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 55%, #0f172a 100%)",
          color: "#f8fafc",
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 6, color: "#7dd3fc" }}>TECH BLOG</div>
        <div style={{ marginTop: 24, fontSize: 96, fontWeight: 700, letterSpacing: -3 }}>
          Jeonsubb
        </div>
        <div style={{ marginTop: 28, fontSize: 34, color: "#cbd5e1" }}>
          Software Engineering / Financial IT
        </div>
        <div style={{ marginTop: 64, fontSize: 28, color: "#64748b" }}>www.jeonsubb.com</div>
      </div>
    ),
    size,
  );
}
