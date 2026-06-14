/**
 * Illustrative portfolio contracts.
 *
 * These types are intentionally generic and do not represent production
 * payloads, protocols, or service APIs.
 */

export interface AudioSample {
  readonly placeholder: true;
}
export interface Transcript {
  readonly text: string;
}

export interface KnowledgeRequest {
  readonly topic: string;
}

export interface KnowledgeResult {
  readonly summary: string;
}

export interface ConversationRequest {
  readonly transcript: Transcript;
}

export interface ConversationResponse {
  readonly text: string;
}

export interface SpeechToText {
  transcribe(audio: AudioSample): Promise<Transcript>;
}

export interface KnowledgeService {
  lookup(request: KnowledgeRequest): Promise<KnowledgeResult>;
}

export interface ConversationalAgent {
  respond(request: ConversationRequest): Promise<ConversationResponse>;
}

export interface AvatarRenderer {
  present(response: ConversationResponse): Promise<void>;
  cancel(): Promise<void>;
}
