"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const meeting_controller_1 = require("../controllers/meeting.controller");
const message_controller_1 = require("../controllers/message.controller");
const router = (0, express_1.Router)();
router.post("/start", meeting_controller_1.startMeeting);
router.post("/message", message_controller_1.sendMessage);
exports.default = router;
