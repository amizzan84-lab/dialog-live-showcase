# Dialog Live Showcase

> **This is a portfolio case study, not the Dialog Live product.**
>
> Dialog Live is proprietary software. The production source code, internal
> prompts, customer configurations, deployment procedures, and implementation
> details cannot be published for confidentiality, security, and
> intellectual-property reasons.

Dialog Live is an end-to-end platform for creating, operating, and remotely
managing conversational digital characters.

It is not a prototype or a speculative architecture exercise. Dialog Live is
already operational across multiple client projects and has been selected for
the **ElevenLabs Grants** program.

The project is larger than the avatar visible to the end user. It includes:

1. **Dialog Studio**, a desktop application used to create and configure each
   character.
2. **Dialog Live**, the realtime application experienced by visitors.
3. **An agentic AI platform**, where every character can reason, use approved
   tools, access scoped knowledge, and produce a voice response.
4. **A remote platform**, used to manage AI configurations, customers,
   installations, access, knowledge, logs, and updates.

This repository explains the engineering work behind those areas without
publishing enough detail to reproduce the commercial platform.

## At A Glance

| Product signal | What it demonstrates |
| --- | --- |
| Operational with multiple clients | The platform has moved beyond prototype validation |
| ElevenLabs Grants participant | External recognition of the voice AI use case |
| End-to-end product ownership | Authoring, AI, realtime media, operations, and delivery |
| Per-character AI agents | Configurable reasoning, tools, knowledge, memory, and voice |
| Remote customer management | Production lifecycle beyond a single local installation |
| Structured logs and diagnostics | Supportability and operational accountability |

## The Product In One Diagram

```mermaid
flowchart LR
    CREATOR["Content creator"]
    STUDIO["Dialog Studio"]
    AGENTS["Agentic AI Platform"]
    PLATFORM["Remote Platform"]
    LIVE["Dialog Live Installation"]
    VISITOR["Visitor"]

    CREATOR -->|"creates and publishes a character"| STUDIO
    STUDIO -->|"publishes approved behavior"| AGENTS
    STUDIO -->|"customer and release management"| PLATFORM
    AGENTS <-->|"authorized conversations"| LIVE
    PLATFORM -->|"installation access and policy"| LIVE
    VISITOR <-->|"realtime voice interaction"| LIVE
    LIVE -->|"usage, health, and conversation logs"| PLATFORM
```

The production system contains additional services and security boundaries that
are intentionally omitted.

## 1. Dialog Studio

Dialog Studio turns a complex technical workflow into a guided desktop
experience. It is the control center used before a character reaches a kiosk.

### What It Handles

- Creating and editing character profiles
- Importing and organizing idle, listening, and speaking media
- Preparing character-specific realtime animation assets
- Configuring voice, language, personality, and approved AI capabilities
- Managing character-specific knowledge sources
- Testing conversation behavior without launching the complete installation
- Validating missing files, incompatible configuration, and incomplete assets
- Publishing protected AI configuration to the remote platform
- Associating characters with customers and installations
- Producing different release packages for local testing and managed delivery
- Updating or removing local and remote character resources

```mermaid
flowchart LR
    CREATE["Create character"]
    MEDIA["Prepare media"]
    BRAIN["Configure AI behavior"]
    TEST["Test and validate"]
    CUSTOMER["Assign customer"]
    PUBLISH["Publish remote configuration"]
    EXPORT["Build installation package"]

    CREATE --> MEDIA --> BRAIN --> TEST
    TEST --> CUSTOMER --> PUBLISH --> EXPORT
```

The main engineering challenge was not building a form. It was making a
multi-service production process repeatable, validated, and understandable for
someone who should not need to operate the underlying tools manually.

[Read the Dialog Studio case study](docs/dialog-studio.md)

## 2. Agentic AI Platform

Every character has an independent conversational agent rather than sharing one
hard-coded chatbot behavior.

An agent can combine:

- Character identity and behavioral instructions
- Session-aware conversation memory
- Speech-to-text input
- Language-model reasoning
- A character-specific set of approved tools
- Customer and character-scoped knowledge
- Text normalization and natural voice synthesis
- Logging, usage attribution, and fallback behavior

```mermaid
flowchart LR
    AUDIO["Visitor audio"]
    STT["Speech-to-Text"]
    AGENT["Character Agent"]
    MEMORY["Session Memory"]
    TOOLS["Approved Tools"]
    KNOWLEDGE["Scoped Knowledge"]
    TTS["Text-to-Speech"]
    RESPONSE["Spoken Response"]

    AUDIO --> STT --> AGENT
    AGENT <--> MEMORY
    AGENT <-->|"tool calls"| TOOLS
    TOOLS <--> KNOWLEDGE
    AGENT --> TTS --> RESPONSE
```

The tool system is extensible. A new capability can be added behind a defined
contract, registered for selected characters, and exposed to the agent without
coupling the core conversation pipeline to one provider or customer workflow.

Examples of tool categories include curated knowledge search, controlled web
research, business-system adapters, and experience-specific actions. The
production tool implementations, prompts, schemas, and orchestration rules are
not published.

[Read the agentic AI case study](docs/agentic-ai-platform.md)

## 3. Dialog Live Runtime

Dialog Live is the visitor-facing application. It coordinates microphone input,
conversation processing, generated speech, character animation, and UI state as
one continuous realtime experience.

### What Happens During An Interaction

```mermaid
flowchart LR
    USER["Visitor speaks"]
    SPEECH["Speech recognition"]
    BRAIN["Character AI"]
    KNOWLEDGE["Approved knowledge"]
    VOICE["Voice generation"]
    AVATAR["Realtime avatar"]

    USER --> SPEECH --> BRAIN
    BRAIN <-->|"when relevant"| KNOWLEDGE
    BRAIN --> VOICE --> AVATAR
    AVATAR -->|"synchronized response"| USER
```

The runtime also has to manage:

- Listening, processing, speaking, idle, cancellation, and error states
- User interruption while a response is being produced or presented
- Coordination between audio availability and visual readiness
- Smooth transitions between pre-recorded and generated character states
- Multiple character configurations without product-specific forks
- Local hardware and service startup
- Health checks, recovery, and actionable diagnostics
- Kiosk packaging, updates, and unattended operation

The proprietary media pipeline, synchronization strategy, timing parameters,
and optimization techniques are not included here.

[Read the Dialog Live runtime case study](docs/dialog-live-runtime.md)

## 4. Remote Platform

The remote platform separates protected intelligence and administration from
the software delivered to an installation.

It supports:

- Centrally managed character AI configurations
- Remote updates to behavior, voice, capabilities, and approved knowledge
- Customer and project organization
- Individual installation activation, suspension, and optional expiration
- Installation-specific access credentials
- Reusable or revocable credential lifecycle
- Thin client packages that do not contain server secrets
- Remote health and usage visibility
- Removal and maintenance of character resources

```mermaid
flowchart TB
    STUDIO["Dialog Studio"]
    CONFIG["Character Configuration Store"]
    CONTROL["Customer and Installation Control"]
    AI["Managed Conversation Services"]
    DATA["Operational Data"]
    KIOSK["Dialog Live Installation"]

    STUDIO --> CONFIG
    STUDIO --> CONTROL
    CONFIG --> AI
    CONTROL -->|"authorizes"| KIOSK
    KIOSK <-->|"conversation requests"| AI
    AI --> DATA
    KIOSK -->|"health and usage"| DATA
```

[Read about remote management](docs/remote-platform.md)

## Data, Logs, And Observability

Dialog Live uses structured operational data rather than treating every kiosk
as an isolated application.

The platform maintains conceptual records for:

| Area | Purpose |
| --- | --- |
| Customers | Identify the organization receiving the experience |
| Projects and characters | Separate experiences belonging to the same customer |
| Installations | Represent each deployed kiosk independently |
| Access credentials | Authorize, rotate, reuse, or revoke installation access |
| Knowledge content | Scope approved information to the correct customer and character |
| Conversations | Record session context and operational metadata |
| Usage | Attribute service consumption to an installation |
| Health diagnostics | Explain whether logging and dependencies are operating correctly |

Conversation logging is designed to answer practical operational questions:

- Which customer, project, character, and installation handled the interaction?
- Which model and optional capabilities were active?
- Was the request a real visitor interaction or an internal test?
- Did the conversation log successfully?
- Is service usage increasing even if another logging path has failed?
- When did an installation last communicate successfully?

Internal tests are explicitly excluded from customer conversation history.
Sensitive credentials are not stored in logs, and administrative database
access is kept on protected services rather than distributed clients.

[Read about data and observability](docs/data-and-observability.md)

## What I Built

My work on Dialog Live spans product engineering, AI systems, media runtime, and
operations:

- Designed the overall architecture and service boundaries
- Built the character creation and management workflow in Dialog Studio
- Built the realtime interaction lifecycle in Dialog Live
- Built a per-character agent architecture with memory and tool calling
- Designed an extensible tool contract for new knowledge and business capabilities
- Integrated speech-to-text and text-to-speech into the conversational lifecycle
- Added language-aware voice preparation for more natural spoken output
- Integrated replaceable language, knowledge, speech, and voice providers
- Designed per-character configuration and remote update behavior
- Built customer, installation, credential, and release-management workflows
- Implemented structured conversation logging and operational diagnostics
- Designed thin client distribution so protected services remain remote
- Built packaging, update, validation, cleanup, and recovery workflows
- Optimized realtime performance for production hardware

This was an end-to-end product effort: from the visitor interaction to the
desktop authoring tools and the operational systems needed to deliver and
support installations.

## Selected Technologies

| Area | Technologies used |
| --- | --- |
| Desktop applications | React, TypeScript, Vite, Electron |
| Backend services | Python, FastAPI, asynchronous service design |
| Realtime communication | WebSocket and browser media APIs |
| Agentic AI | LLM orchestration, native tool calling, provider adapters |
| Voice AI | ElevenLabs Speech-to-Text and Text-to-Speech |
| Knowledge | Character-scoped retrieval and extensible tool adapters |
| Data platform | Supabase, PostgreSQL, row-level access control |
| Remote runtime | Docker, reverse proxy, managed Linux services |
| Delivery | GitHub Actions, desktop packaging, thin client releases |
| Media | WebGL and hardware-accelerated visual processing |

The table communicates the breadth of the work without acting as a production
dependency manifest or implementation guide.

## From Prototype To Product

The engineering effort also included the work required to move from a promising
demo to a system that can be delivered:

- Repeatable character onboarding instead of hand-built configuration
- Tool-enabled agents instead of fixed question-and-answer scripts
- Customer and installation isolation
- Protected remote services and thin distributed clients
- Revocable installation access
- Structured conversation and usage attribution
- Health diagnostics for support
- Remote character updates
- Packaging and update workflows
- Cleanup across local and remote resources

These capabilities are now used in operational projects for multiple clients.

## Repository Guide

| Document | What it explains |
| --- | --- |
| [Dialog Studio](docs/dialog-studio.md) | Character creation, testing, validation, publishing, and export |
| [Agentic AI Platform](docs/agentic-ai-platform.md) | Per-character agents, tool calling, STT, TTS, memory, and extensibility |
| [Dialog Live Runtime](docs/dialog-live-runtime.md) | Visitor interaction and realtime application responsibilities |
| [Remote Platform](docs/remote-platform.md) | Remote brains, customers, installations, credentials, and delivery |
| [Data and Observability](docs/data-and-observability.md) | Database concepts, conversation logs, usage, and health diagnostics |
| [Mock Contracts](src/contracts/index.ts) | Small illustrative interfaces with no production behavior |
| [Screenshot Plan](screenshots/README.md) | Public-safe media still to be reviewed and added |

## Portfolio Disclaimer

> This repository is a public showcase of architectural concepts inspired by
> Dialog Live. It does not contain production code, proprietary workflows,
> internal models, customer configurations, or implementation details of the
> commercial platform.

All diagrams, interfaces, names, and examples are simplified for communication.
They do not reproduce the production architecture and are not intended to
provide a blueprint for rebuilding the platform.
