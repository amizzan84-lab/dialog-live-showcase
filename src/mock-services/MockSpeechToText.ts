import type { AudioSample, SpeechToText, Transcript } from "../contracts";

/**
 * Placeholder only. No audio is inspected or transmitted.
 */
export class MockSpeechToText implements SpeechToText {
  async transcribe(_audio: AudioSample): Promise<Transcript> {
    return { text: "Illustrative transcript" };
  }
}
