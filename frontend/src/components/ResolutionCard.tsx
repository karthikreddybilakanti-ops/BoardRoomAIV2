type Resolution = {
  decision: string;
  confidence: number;
  summary: string;
};

type Props = {
  resolution: Resolution;
};

export default function ResolutionCard({
  resolution,
}: Props) {
  return (
    <div
      style={{
        background: "rgba(15,23,42,.9)",
        border: "1px solid rgba(255,255,255,.08)",
        borderRadius: 20,
        padding: 24,
        boxShadow: "0 10px 30px rgba(0,0,0,.25)",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: 24,
          color: "white",
          fontSize: 24,
        }}
      >
        📋 Final Board Resolution
      </h2>

      <div
        style={{
          marginBottom: 20,
        }}
      >
        <div
          style={{
            color: "#94a3b8",
            fontSize: 14,
            marginBottom: 8,
          }}
        >
          FINAL DECISION
        </div>

        <div
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#22c55e",
          }}
        >
          {resolution.decision}
        </div>
      </div>

      <div
        style={{
          marginBottom: 20,
        }}
      >
        <div
          style={{
            color: "#94a3b8",
            fontSize: 14,
            marginBottom: 8,
          }}
        >
          CONFIDENCE
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              flex: 1,
              height: 12,
              background: "#334155",
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${resolution.confidence}%`,
                height: "100%",
                background: "#22c55e",
                transition: "width .4s",
              }}
            />
          </div>

          <strong
            style={{
              color: "#22c55e",
            }}
          >
            {resolution.confidence}%
          </strong>
        </div>
      </div>

      <div>
        <div
          style={{
            color: "#94a3b8",
            fontSize: 14,
            marginBottom: 8,
          }}
        >
          EXECUTIVE SUMMARY
        </div>

        <div
          style={{
            color: "#e2e8f0",
            lineHeight: 1.8,
            background: "#1e293b",
            padding: 16,
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,.06)",
          }}
        >
          {resolution.summary}
        </div>
      </div>
    </div>
  );
}