import { ImageResponse } from "next/og";

export const alt = "Aulafy, cursos gratuitos de inteligencia artificial open source";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#0b0914",
          color: "white",
          display: "flex",
          height: "100%",
          overflow: "hidden",
          padding: "72px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "#8b5cf6",
            borderRadius: "999px",
            filter: "blur(4px)",
            height: "510px",
            opacity: 0.42,
            position: "absolute",
            right: "-90px",
            top: "-180px",
            width: "510px",
          }}
        />
        <div
          style={{
            background: "#22d3ee",
            borderRadius: "999px",
            bottom: "-230px",
            filter: "blur(4px)",
            height: "470px",
            opacity: 0.28,
            position: "absolute",
            right: "245px",
            width: "470px",
          }}
        />
        <div
          style={{
            border: "1px solid rgba(232, 121, 249, 0.35)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "54px",
            position: "relative",
            width: "100%",
          }}
        >
          <div style={{ alignItems: "center", display: "flex", gap: "22px" }}>
            <div
              style={{
                alignItems: "center",
                background: "linear-gradient(135deg, #8b5cf6, #e879f9 55%, #22d3ee)",
                borderRadius: "24px",
                display: "flex",
                fontSize: "58px",
                fontWeight: 800,
                height: "92px",
                justifyContent: "center",
                width: "92px",
              }}
            >
              A
            </div>
            <div style={{ fontSize: "42px", fontWeight: 700, letterSpacing: "1px" }}>AULAFY</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: "850px" }}>
            <div style={{ color: "#22d3ee", fontSize: "23px", letterSpacing: "3px", marginBottom: "18px" }}>
              CURSOS ABIERTOS DE INTELIGENCIA ARTIFICIAL
            </div>
            <div style={{ fontSize: "64px", fontWeight: 800, letterSpacing: "-1px", lineHeight: 1.04 }}>
              Aprende IA práctica.
            </div>
            <div style={{ color: "#d8d2e8", fontSize: "31px", lineHeight: 1.35, marginTop: "18px" }}>
              Claude Code, IA local, RAG, agentes y automatización.
            </div>
          </div>
          <div style={{ color: "#d9b5ff", display: "flex", fontSize: "22px", gap: "28px" }}>
            <span>Gratis</span>
            <span>Open source</span>
            <span>Español e inglés</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
