"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeakerScheduler = exports.SPEAKERS = void 0;
exports.SPEAKERS = [
    "CEO",
    "CFO",
    "CMO",
    "COO",
    "CRO",
];
class SpeakerScheduler {
    index = 0;
    next() {
        const speaker = exports.SPEAKERS[this.index];
        this.index = (this.index + 1) % exports.SPEAKERS.length;
        return speaker;
    }
    reset() {
        this.index = 0;
    }
}
exports.SpeakerScheduler = SpeakerScheduler;
