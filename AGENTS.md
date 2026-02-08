# Instructions
- Use `docs/context.md` as authoritative project context.
- If there are several possibilities, list the options and ask the user.
- maintain a log of the prompts in `docs/context.md` under "Prompt log"
- keep `docs/architecture.md` updated.
- Always build the application after code changes.

## Restrictions
- Stay inside this folder!
- Never revert files.
- Use `touch` to create new files.
- Use the 'apply_patch' feature to change files.

## Relevant files
name | purpose
--- | ---
`docs/context.md` | Prompt chaining and log
`docs/design.md` | system design and architecture
`docs/decisions.md` | records design decision made during development

## Generated files
The user will start the required programs that will build:
- `main.css` from `src/main.scss`
- `demo.js` from `src/demo.ts`
- `viewlink.js` from `src/viewlink.ts`
Inspect that the modification time of the files have changed and if not tell the user to run the Visual Studio code tasks defined under `.vscode/tasks.json`

# Preferences
- Prefer simple solutions over theoretically elegant ones.

# Environment
- Code files are edited in VSCodium; debugging happens in VSCodium.
- Firefox is the used browser.

# Abbreviations
- "good" means the following
    - summarize the previous prompts and the prompt log and replace the section "Prompt log" in `docs/context.md`
    - git stage all modified files.
    - make a git commit with the summary of current status as the commit message

