type Props = {
  name: string;
  role: string;
  emoji: string;
  color: string;
  active: boolean;
  finished?: boolean;
};

export default function ExecutiveCard({
  name,
  role,
  emoji,
  color,
  active,
  finished = false,
}: Props) {
  return (
    <div
      style={{
        background: active
          ? "linear-gradient(145deg,#1e293b,#0f172a)"
          : "rgba(15,23,42,0.88)",
        border: active
          ? `2px solid ${color}`
          : "1px solid rgba(255,255,255,.08)",
        borderRadius: 20,
        padding: 22,
        textAlign: "center",
        transition: "all .35s ease",
        boxShadow: active
          ? `0 0 35px ${color}55`
          : "0 10px 25px rgba(0,0,0,.25)",
        transform: active ? "translateY(-6px)" : "translateY(0)",
      }}
    >
      <div
        style={{
          fontSize: 46,
          marginBottom: 12,
        }}
      >
        {emoji}
      </div>

      <h2
        style={{
          margin: 0,
          color: "white",
          fontSize: 22,
        }}
      >
        {name}
      </h2>

      <div
        style={{
          marginTop: 8,
          color: "#94a3b8",
          fontSize: 14,
        }}
      >
        {role}
      </div>

      <div
        style={{
          marginTop: 20,
          display: "inline-block",
          padding: "8px 16px",
          borderRadius: 999,
          fontWeight: 700,
          fontSize: 14,
          background: active
            ? `${color}22`
            : finished
            ? "#16a34a22"
            : "#334155",
          color: active
            ? color
            : finished
            ? "#22c55e"
            : "#94a3b8",
        }}
      >
        {active
          ? "🎤 Speaking..."
          : finished
          ? "✅ Finished"
          : "⏳ Waiting"}
      </div>
    </div>
  );
}