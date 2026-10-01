import React from "react";
import { Button as Btn } from "../ds.js";
import { Icons as Ic2 } from "../Icons.jsx";
import { Footer as Ftr } from "../Chrome.jsx";
import { useGo } from "../shared.jsx";

export default function ThanksScreen() {
  const go = useGo();
  return (
    <div>
      <div
        style={{
          minHeight: 520,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "40px 30px",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            width: 76,
            height: 76,
            borderRadius: "50%",
            background: "var(--bg-tint)",
            color: "var(--accent)",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 22,
          }}
        >
          <Ic2.Check size={38} />
        </span>
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            fontSize: 28,
            color: "var(--text-strong)",
            margin: "0 0 10px",
          }}
        >
          Yiasou! Got it.
        </h1>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: 16,
            lineHeight: 1.6,
            maxWidth: 320,
            margin: "0 0 26px",
          }}
        >
          Thanks for reaching out — we'll be in touch soon. Welcome to the
          parea.
        </p>
        <Btn variant="primary" size="lg" onClick={() => go("events")}>
          See upcoming events
        </Btn>
      </div>
      <Ftr />
    </div>
  );
}
