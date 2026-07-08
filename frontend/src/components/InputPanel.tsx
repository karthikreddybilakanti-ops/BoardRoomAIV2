type Props = {
  message: string;
  loading: boolean;
  listening: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
  onVoice: () => void;
};

export default function InputPanel({
  message,
  loading,
  listening,
  onChange,
  onSend,
  onVoice,
}: Props) {
  return (
    <div
      style={{
        marginTop: 25,
        display: "flex",
        gap: 15,
        alignItems: "center",
      }}
    >
      <input
        value={message}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ask the executive board..."
        disabled={loading}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSend();
          }
        }}
        style={{
          flex: 1,
          padding: "18px 20px",
          borderRadius: 14,
          border: "1px solid #334155",
          background: "#0f172a",
          color: "white",
          fontSize: 17,
          outline: "none",
        }}
      />

      <button
        onClick={onSend}
        disabled={loading}
        style={{
          width: 150,
          height: 56,
          border: "none",
          borderRadius: 14,
          cursor: "pointer",
          background: "#2563eb",
          color: "white",
          fontSize: 16,
          fontWeight: "bold",
          transition: ".3s",
        }}
      >
        {loading ? "Thinking..." : "Send"}
      </button>

      <button
        onClick={onVoice}
        disabled={loading || listening}
        style={{
          width: 170,
          height: 56,
          border: "none",
          borderRadius: 14,
          cursor: "pointer",
          background: listening ? "#dc2626" : "#16a34a",
          color: "white",
          fontSize: 16,
          fontWeight: "bold",
          transition: ".3s",
        }}
      >
        {listening ? "🎙 Listening..." : "🎤 Voice"}
      </button>
    </div>
  );
}