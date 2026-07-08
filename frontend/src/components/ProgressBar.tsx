type Props = {
  activeSpeaker: string;
  finished: boolean;
};

const ORDER = ["CEO", "CFO", "CMO", "COO", "CRO"];

export default function ProgressBar({
  activeSpeaker,
  finished,
}: Props) {
  const activeIndex = ORDER.indexOf(activeSpeaker);

  return (
    <div
      style={{
        marginTop: 30,
        marginBottom: 35,
        background: "#0f172a",
        borderRadius: 16,
        padding: 20,
        border: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 18,
        }}
      >
        <h3
          style={{
            margin: 0,
            color: "white",
            fontSize: 18,
          }}
        >
          Board Discussion Progress
        </h3>

        <span
          style={{
            color: finished ? "#22c55e" : "#38bdf8",
            fontWeight: "bold",
            fontSize: 15,
          }}
        >
          {finished
            ? "✅ Meeting Complete"
            : `🎙️ ${activeSpeaker} Speaking`}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        {ORDER.map((role, index) => {
          const completed = index < activeIndex;
          const current =
            role === activeSpeaker && !finished;

          return (
            <div
              key={role}
              style={{
                flex: 1,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  height: 12,
                  borderRadius: 999,
                  background: current
                    ? "#3b82f6"
                    : completed || finished
                    ? "#22c55e"
                    : "#334155",
                  transition: ".35s",
                }}
              />

              <div
                style={{
                  marginTop: 10,
                  color: current
                    ? "#60a5fa"
                    : completed || finished
                    ? "#22c55e"
                    : "#94a3b8",
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                {role}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}