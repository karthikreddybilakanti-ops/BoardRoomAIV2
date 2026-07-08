import { useEffect, useRef, useState } from "react";

import Header from "../components/Header";
import ExecutiveCard from "../components/ExecutiveCard";
import ProgressBar from "../components/ProgressBar";
import DiscussionPanel from "../components/DiscussionPanel";
import InputPanel from "../components/InputPanel";
import VotePanel from "../components/VotePanel";
import ResolutionCard from "../components/ResolutionCard";

import { startMeeting, sendMessage } from "../api/meetingApi";

type Message = {
  speaker: string;
  content: string;
};

type Vote = {
  executive: string;
  vote: "YES" | "NO" | "ABSTAIN";
  reason?: string;
};

type Resolution = {
  decision: string;
  confidence: number;
  summary: string;
};

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const EXECUTIVES = [
  {
    name: "CEO",
    role: "Chief Executive Officer",
    emoji: "👨‍💼",
    color: "#22c55e",
  },
  {
    name: "CFO",
    role: "Chief Financial Officer",
    emoji: "💰",
    color: "#3b82f6",
  },
  {
    name: "CMO",
    role: "Chief Marketing Officer",
    emoji: "📈",
    color: "#ec4899",
  },
  {
    name: "COO",
    role: "Chief Operating Officer",
    emoji: "⚙️",
    color: "#f59e0b",
  },
  {
    name: "CRO",
    role: "Chief Risk Officer",
    emoji: "🛡️",
    color: "#ef4444",
  },
];

export default function MeetingPage() {
  const [problem, setProblem] = useState("");

  const [meetingId, setMeetingId] = useState("");

  const [history, setHistory] = useState<Message[]>([]);

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [listening, setListening] = useState(false);

  const [meetingFinished, setMeetingFinished] = useState(false);

  const [activeSpeaker, setActiveSpeaker] = useState("");

  const [votes, setVotes] = useState<Vote[]>([]);

  const [resolution, setResolution] =
    useState<Resolution | null>(null);

  const transcriptRef =
    useRef<HTMLDivElement>(null);

  const recognitionRef = useRef<any>(null);

  const runningMeetingRef = useRef(false);

  const finishedExecutivesRef =
    useRef<string[]>([]);
      useEffect(() => {
    transcriptRef.current?.scrollTo({
      top: transcriptRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [history]);

  useEffect(() => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onresult = async (event: any) => {
      const text = event.results[0][0].transcript;

      setMessage(text);

      await sendUserMessage(text);
    };

    recognitionRef.current = recognition;
  }, []);

  function startListening() {
    recognitionRef.current?.start();
  }

  function speak(text: string): Promise<void> {
    return new Promise((resolve) => {
      window.speechSynthesis.cancel();

      const speech = new SpeechSynthesisUtterance(text);

      const voices = window.speechSynthesis.getVoices();

      if (voices.length > 0) {
        speech.voice = voices[0];
      }

      speech.rate = 1;
      speech.pitch = 1;

      speech.onend = () => resolve();

      window.speechSynthesis.speak(speech);
    });
  }

  function executiveFinished(name: string) {
    return finishedExecutivesRef.current.includes(name);
  }

  function markFinished(name: string) {
    if (!executiveFinished(name)) {
      finishedExecutivesRef.current.push(name);
    }
  }

  useEffect(() => {
    if (!history.length) return;

    const last = history[history.length - 1];

    if (last.speaker !== "USER") {
      markFinished(last.speaker);
    }
  }, [history]);

  async function continueMeeting(id: string) {
    if (runningMeetingRef.current) return;

    if (!id) return;

    runningMeetingRef.current = true;

    try {
      while (true) {
        const res = await sendMessage(
          id,
          "__CONTINUE__"
        );

        setHistory(res.history);

        setActiveSpeaker(
          res.currentSpeaker || res.speaker
        );

        await speak(res.message);

        if (res.votes) {
          setVotes(res.votes);
        }

        if (res.resolution) {
          setResolution(res.resolution);
        }

        if (res.finished) {
          setMeetingFinished(true);
          break;
        }

        await new Promise((resolve) =>
          setTimeout(resolve, 800)
        );
      }
    } catch (err) {
      console.error(err);
    }

    runningMeetingRef.current = false;
  }
    async function handleMeeting() {
    if (!problem.trim()) return;

    setLoading(true);

    try {
      const data = await startMeeting(problem);

      setMeetingId(data.meetingId);

      setHistory(data.history);

      if (data.history.length > 0) {
        const first = data.history[data.history.length - 1];

        setActiveSpeaker(first.speaker);

        await speak(first.content);
      }

      setLoading(false);

      // Automatically continue the board discussion
      setTimeout(() => {
        continueMeeting(data.meetingId);
      }, 1000);

    } catch (err) {
      console.error(err);

      alert("Unable to start meeting.");

      setLoading(false);
    }
  }

  async function sendUserMessage(custom?: string) {
    const text = custom || message;

    if (!text.trim()) return;

    if (!meetingId) return;

    setLoading(true);

    try {
      const res = await sendMessage(meetingId, text);

      setHistory(res.history);

      setMessage("");

      setActiveSpeaker(
        res.currentSpeaker || res.speaker
      );

      await speak(res.message);

      if (res.votes) {
        setVotes(res.votes);
      }

      if (res.resolution) {
        setResolution(res.resolution);
      }

      if (res.finished) {
        setMeetingFinished(true);
      }

    } catch (err) {
      console.error(err);

      alert("Failed to send message.");
    }

    setLoading(false);
  }
    return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background:
          "linear-gradient(135deg,#050816 0%,#0f172a 45%,#111827 100%)",
        color: "white",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <Header />

      <div
        style={{
          width: "100%",
          padding: "30px 40px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            maxWidth: "1800px",
            margin: "0 auto",
          }}
        >
          <textarea
            rows={4}
            value={problem}
            disabled={meetingId !== ""}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Describe your business challenge..."
            style={{
              width: "100%",
              background: "#111827",
              color: "white",
              border: "1px solid #334155",
              borderRadius: 16,
              padding: 20,
              fontSize: 18,
              resize: "none",
              outline: "none",
            }}
          />

          {!meetingId && (
            <button
              onClick={handleMeeting}
              disabled={loading}
              style={{
                marginTop: 20,
                width: "100%",
                height: 60,
                border: "none",
                borderRadius: 14,
                cursor: "pointer",
                fontSize: 18,
                fontWeight: 700,
                color: "white",
                background:
                  "linear-gradient(90deg,#2563eb,#4f46e5)",
              }}
            >
              {loading
                ? "Starting Board Meeting..."
                : "🚀 Start Board Meeting"}
            </button>
          )}

          {meetingId && (
            <>
              <ProgressBar
                activeSpeaker={activeSpeaker}
                finished={meetingFinished}
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit,minmax(220px,1fr))",
                  gap: 20,
                  marginTop: 30,
                  marginBottom: 30,
                }}
              >
                {EXECUTIVES.map((exec) => (
                  <ExecutiveCard
                    key={exec.name}
                    name={exec.name}
                    role={exec.role}
                    emoji={exec.emoji}
                    color={exec.color}
                    active={activeSpeaker === exec.name}
                    finished={executiveFinished(exec.name)}
                  />
                ))}
              </div>
                            <DiscussionPanel
                history={history}
                transcriptRef={transcriptRef}
              />

              <div
                style={{
                  marginTop: 24,
                }}
              >
                <InputPanel
                  message={message}
                  loading={loading}
                  listening={listening}
                  onChange={(value: string) =>
                    setMessage(value)
                  }
                  onSend={() => sendUserMessage()}
                  onVoice={startListening}
                />
              </div>

              {(votes.length > 0 || resolution) && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit,minmax(420px,1fr))",
                    gap: 24,
                    marginTop: 30,
                  }}
                >
                  {votes.length > 0 && (
                    <VotePanel votes={votes} />
                  )}

                  {resolution && (
                    <ResolutionCard
                      resolution={resolution}
                    />
                  )}
                </div>
              )}

              {meetingFinished && (
                <div
                  style={{
                    marginTop: 30,
                    padding: 24,
                    borderRadius: 18,
                    border: "2px solid #22c55e",
                    background:
                      "linear-gradient(135deg,#052e16,#064e3b)",
                    textAlign: "center",
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      color: "#22c55e",
                      fontSize: 28,
                    }}
                  >
                    ✅ Board Meeting Successfully Completed
                  </h2>

                  <p
                    style={{
                      marginTop: 14,
                      color: "#d1fae5",
                      lineHeight: 1.7,
                      fontSize: 16,
                    }}
                  >
                    All executives have completed their
                    discussion, voting and final decision.
                    You can continue asking follow-up
                    business questions to the board at any
                    time.
                  </p>
                </div>
              )}
                          </>
          )}
        </div>
      </div>
    </div>
  );
}