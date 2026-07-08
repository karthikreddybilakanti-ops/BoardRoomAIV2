import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import meetingRoutes from "./routes/meeting.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "🚀 BoardroomOS Backend Running",
  });
});

app.use("/api/meeting", meetingRoutes);

export default app;