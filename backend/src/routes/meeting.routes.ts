import { Router } from "express";
import { startMeeting } from "../controllers/meeting.controller"
import { sendMessage } from "../controllers/message.controller";

const router = Router();

router.post("/start", startMeeting)
router.post("/message", sendMessage);

export default router;