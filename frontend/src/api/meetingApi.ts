import axios from "axios";

const API = "https://boardroomai-d1cr.onrender.com/api/meeting";

const api = axios.create({
  baseURL: API,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function startMeeting(problem: string) {
  const { data } = await api.post("/start", {
    problem,
  });

  return data;
}

export async function sendMessage(
  meetingId: string,
  message: string
) {
  const { data } = await api.post("/message", {
    meetingId,
    message,
  });

  return data;
}