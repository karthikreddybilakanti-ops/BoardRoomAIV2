export default function Header() {
  return (
    <div
      style={{
        padding: "35px 40px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        background:
          "linear-gradient(90deg,#020617,#0f172a,#111827)",
      }}
    >
      <div
        style={{
          maxWidth: "1800px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 42,
            fontWeight: 800,
            letterSpacing: 1,
            color: "white",
          }}
        >
          🏢 BOARDROOM OS
        </h1>

        <div
          style={{
            marginTop: 8,
            color: "#94a3b8",
            fontSize: 18,
          }}
        >
          Autonomous Executive Intelligence
        </div>
      </div>
    </div>
  );
}