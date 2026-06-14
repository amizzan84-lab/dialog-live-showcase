import type {
  KnowledgeRequest,
  KnowledgeResult,
  KnowledgeService,
} from "../contracts";

/**
 * Placeholder only. No retrieval, storage, or external service is used.
 */
export class MockKnowledgeService implements KnowledgeService {
  async lookup(_request: KnowledgeRequest): Promise<KnowledgeResult> {
    return { summary: "Illustrative approved knowledge" };
  }
}
