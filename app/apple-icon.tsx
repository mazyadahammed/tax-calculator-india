import { ImageResponse } from "next/og";

export const runtime = "edge";

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
          color: "white",
          fontSize: "100px",
          fontWeight: "bold",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        ₹
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
