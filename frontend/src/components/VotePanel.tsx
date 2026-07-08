type Vote = {
  executive: string;
  vote: "YES" | "NO" | "ABSTAIN";
  reason?: string;
};

type Props = {
  votes: Vote[];
};

export default function VotePanel({ votes }: Props) {
  const voteColor = (vote: string) => {
    switch (vote) {
      case "YES":
        return "#22c55e";
      case "NO":
        return "#ef4444";
      default:
        return "#f59e0b";
    }
  };

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
          marginBottom: 20,
          color: "white",
          fontSize: 24,
        }}
      >
        🗳 Executive Voting
      </h2>

      {votes.length === 0 ? (
        <div
          style={{
            color: "#94a3b8",
            textAlign: "center",
            padding: 30,
          }}
        >
          Waiting for executives to vote...
        </div>
      ) : (
        votes.map((vote, index) => (
          <div
            key={index}
            style={{
              marginBottom: 18,
              padding: 16,
              borderRadius: 14,
              background: "#1e293b",
              border: "1px solid rgba(255,255,255,.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <strong
                style={{
                  color: "white",
                  fontSize: 17,
                }}
              >
                {vote.executive}
              </strong>

              <span
                style={{
                  padding: "6px 14px",
                  borderRadius: 999,
                  background: `${voteColor(vote.vote)}22`,
                  color: voteColor(vote.vote),
                  fontWeight: "bold",
                }}
              >
                {vote.vote}
              </span>
            </div>

            {vote.reason && (
              <div
                style={{
                  color: "#cbd5e1",
                  lineHeight: 1.6,
                  fontSize: 15,
                }}
              >
                {vote.reason}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}