# Dialog Live Showcase

> **This is a portfolio case study, not the Dialog Live product.**
>
> Dialog Live is proprietary software. The production source code, internal
> prompts, customer configurations, deployment procedures, and implementation
> details cannot be published for confidentiality, security, and
> intellectual-property reasons.

Dialog Live is an end-to-end platform for creating, operating, and remotely
managing conversational digital characters.

The project is larger than the avatar visible to the end user. It includes:

1. **Dialog Studio**, a desktop application used to create and configure each
   character.
2. **Dialog Live**, the realtime application experienced by visitors.
3. **A remote platform**, used to manage AI configurations, customers,
   installations, access, knowledge, logs, and updates.

This repository explains the engineering work behind those three areas without
publishing enough detail to reproduce the commercial platform.

## The Product In One Diagram

```mermaid
flowchart LR
    CREATOR["Content creator"]
    STUDIO["Dialog Studio"]
    PLATFORM["Remote Platform"]
    LIVE["Dialog Live Installation"]
    VISITOR["Visitor"]

    CREATOR -->|"creates and publishes a character"| STUDIO
    STUDIO -->|"approved configuration and release"| PLATFORM
    PLATFORM -->|"managed AI and access"| LIVE
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

## 2. Dialog Live Runtime

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

## 3. Remote Platform

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
- Integrated replaceable speech, language, knowledge, and voice services
- Designed per-character configuration and remote update behavior
- Built customer, installation, credential, and release-management workflows
- Implemented structured conversation logging and operational diagnostics
- Designed thin client distribution so protected services remain remote
- Built packaging, update, validation, cleanup, and recovery workflows
- Optimized realtime performance for production hardware

This was an end-to-end product effort: from the visitor interaction to the
desktop authoring tools and the operational systems needed to deliver and
support installations.

## Technology Areas

- React, TypeScript, and Electron desktop applications
- Python service architecture and asynchronous processing
- Realtime browser media and bidirectional communication
- AI orchestration with replaceable provider boundaries
- Managed relational data and access control
- Hardware-accelerated media processing
- Containerized remote services
- Automated packaging, update, and deployment workflows

This list describes technology areas only. It is not a production dependency
manifest.

## Repository Guide

| Document | What it explains |
| --- | --- |
| [Dialog Studio](docs/dialog-studio.md) | Character creation, testing, validation, publishing, and export |
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
