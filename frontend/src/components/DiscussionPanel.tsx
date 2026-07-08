type Message = {
  speaker: string;
  content: string;
};

type Props = {
  history: Message[];
  transcriptRef: React.RefObject<HTMLDivElement | null>;
};

export default function DiscussionPanel({
  history,
  transcriptRef,
}: Props) {
  return (
    <div
      ref={transcriptRef}
      style={{
        height: 520,
        overflowY: "auto",
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
        💬 Live Board Discussion
      </h2>

      {history.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginTop: 120,
            fontSize: 18,
          }}
        >
          The meeting has not started yet.
        </div>
      ) : (
        history.map((msg, index) => {
          const isUser = msg.speaker === "USER";

          const speakerColor =
            msg.speaker === "CEO"
              ? "#22c55e"
              : msg.speaker === "CFO"
              ? "#3b82f6"
              : msg.speaker === "CMO"
              ? "#ec4899"
              : msg.speaker === "COO"
              ? "#f59e0b"
              : msg.speaker === "CRO"
              ? "#ef4444"
              : "#38bdf8";

          return (
            <div
              key={index}
              style={{
                marginBottom: 22,
                display: "flex",
                flexDirection: "column",
                alignItems: isUser ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  marginBottom: 8,
                  fontWeight: 700,
                  color: speakerColor,
                  fontSize: 15,
                }}
              >
                {msg.speaker}
              </div>

              <div
                style={{
                  maxWidth: "85%",
                  padding: "16px 18px",
                  borderRadius: 16,
                  background: isUser
                    ? "#2563eb"
                    : "#1e293b",
                  color: "white",
                  lineHeight: 1.7,
                  whiteSpace: "pre-wrap",
                  border: isUser
                    ? "1px solid #3b82f6"
                    : "1px solid rgba(255,255,255,.08)",
                  wordBreak: "break-word",
                }}
              >
                {msg.content}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}