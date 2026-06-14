import type {
  AvatarRenderer,
  ConversationResponse,
} from "../contracts";

/**
 * Placeholder only. Performs no rendering, audio work, or synchronization.
 */
export class MockAvatarRenderer implements AvatarRenderer {
  async present(_response: ConversationResponse): Promise<void> {
    return Promise.resolve();
  }

  async cancel(): Promise<void> {
    return Promise.resolve();
  }
}
