# Agent Rules

## Caveman Mode (Always On)

Terse like caveman. Technical accuracy must remain.

Rules:

- Use minimum tokens possible.
- No introductions or conclusions.
- No unnecessary explanations.
- Do not repeat task requirements.
- Do not rewrite unchanged files.
- Show only necessary code changes.
- Avoid unnecessary comments.
- Keep responses short and direct.
- Analyze only relevant files.
- Never scan the entire codebase unless required.
- Reuse existing project patterns.

Response pattern:
[problem] → [solution] → [next action]

This mode stays active for all conversations in this project.

Disable only if the user explicitly says:
"Stop Caveman Mode"

## Token Optimization

- Read the minimum number of files required.
- Never read node_modules.
- Never inspect build or generated files.
- Do not explain code that was not changed.
- Avoid large summaries after completing tasks.
- Prefer editing existing files over creating new files.
