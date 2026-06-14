# Dialog Studio

Dialog Studio is the authoring and operations application for Dialog Live. Its
purpose is to make the creation of a conversational character repeatable from a
single interface.

## Why It Exists

A character depends on more than a name and an image. It needs coordinated
media, AI behavior, voice settings, approved knowledge, runtime configuration,
customer ownership, access policy, and a valid delivery package.

Without Studio, those tasks would require manually editing configuration files,
running preparation tools, checking generated assets, publishing remote
resources, and assembling installation packages.

Studio turns that process into a guided workflow with validation and clear
status.

## Character Creation

The creation workflow establishes:

- Character identity and display information
- Runtime destination and deployment profile
- Voice and language configuration
- AI behavior and system instructions
- Optional knowledge capabilities
- Media pools for idle, listening, and speaking states

Each character remains isolated so that its behavior, assets, knowledge, and
release lifecycle can evolve independently.

## Media And Animation Preparation

Studio imports source media, organizes it by runtime purpose, and coordinates
the preparation of character-specific animation data.

The application verifies that:

- Source media exists
- Generated data was actually produced
- Runtime references point to valid assets
- Rebuilding an existing asset is an explicit action
- Removing an item does not silently leave inconsistent references
- Legacy or incomplete assets are clearly identified

The preparation algorithms and generated production data are proprietary and
are not represented in this repository.

## AI Configuration

Studio provides one place to configure the character's conversational identity:

- Display identity and language
- Voice profile
- Behavioral instructions
- Model-level preferences
- Approved optional capabilities
- Knowledge ownership
- Failure and fallback behavior
- Logging attribution

The configuration is validated before use. Character-specific behavior can be
updated without modifying the shared platform.

## Integrated Testing

The application includes a focused conversation test that does not require the
full visual runtime.

This shortens iteration time for:

- Speech recognition
- Character behavior
- Voice output
- Knowledge responses
- Error handling

Test requests are marked as tests so they do not pollute real conversation
history or customer reporting.

## Customer And Remote Management

Studio connects character creation to delivery:

1. Select or create a customer.
2. Associate a character with that customer and project.
3. Publish the approved AI configuration.
4. Create an installation record.
5. Issue or reuse an installation credential.
6. Define activation, suspension, and optional expiration.
7. Build the appropriate installation package.

Credentials are treated as managed objects. Existing active credentials can be
reused intentionally; new credentials are not created silently.

## Export And Delivery

Different scenarios require different outputs. Studio separates:

- Local development exports
- Character-only data exports
- Standalone local packages
- Shared media-runtime exports
- Thin managed-client packages

Remote AI publishing is separate from client packaging. This makes it possible
to update character behavior without rebuilding the entire installation.

## Cleanup And Lifecycle

Deleting a character is not just deleting a folder. Related resources may exist
in media caches, knowledge storage, logs, remote configuration, runtime
services, installations, and credentials.

Studio presents those resources as explicit cleanup choices and can create a
local backup before removal.

## Engineering Value

Dialog Studio demonstrates:

- Desktop product design for a multi-service technical workflow
- Process orchestration and progress reporting
- Strong validation before persistent configuration changes
- Local and remote resource lifecycle management
- Failure-aware file and process handling
- Secure separation of publish, package, and administration tasks
