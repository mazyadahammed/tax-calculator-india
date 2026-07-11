import { ImageResponse } from "next/og";

export const runtime = "edge";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
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
          borderRadius: "8px",
          color: "white",
          fontSize: "20px",
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
