import type {
  ConversationRequest,
  ConversationResponse,
  ConversationalAgent,
} from "../contracts";

/**
 * Placeholder only. Contains no model call, prompt, tools, or decision logic.
 */
export class MockAgent implements ConversationalAgent {
  async respond(_request: ConversationRequest): Promise<ConversationResponse> {
    return { text: "Illustrative conversational response" };
  }
}
