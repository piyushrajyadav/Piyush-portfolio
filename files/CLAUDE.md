# CLAUDE.md — Agent Builder Project Context

This file is read by Claude Code at the start of every session. It contains everything needed to understand the project, make correct decisions, and avoid common mistakes. Read it fully before making any changes.

---

## What This Project Is

Agent Builder is a conversational platform that automatically designs and deploys AI agents. A user describes what they want in plain English. An AI interviewer asks clarifying questions across eight dimensions (purpose, tools, memory, LLM preference, integration, escalation, tone, error handling). Once the spec is confirmed, the system synthesizes working LangGraph Python code, deploys it, and gives the user a live API endpoint and test interface.

The key philosophy: conversation-first, not canvas-first. We never ask users to drag blocks. We ask them questions.

---

## Project Structure

```
agent-builder/
├── frontend/                  # Next.js 14 App Router, TypeScript, Tailwind
│   ├── app/
│   │   ├── build/page.tsx     # Main build interface (chat + spec preview)
│   │   ├── agents/page.tsx    # My Agents dashboard
│   │   └── agents/[id]/       # Individual agent page (test, code, history)
│   ├── components/
│   │   ├── ChatMessage.tsx    # Single chat message component
│   │   ├── AgentChat.tsx      # Reusable chat interface (used in build + test)
│   │   ├── DimensionProgress.tsx  # 8-segment progress bar
│   │   └── WorkflowViewer.tsx # React Flow workflow diagram
│   └── lib/api.ts             # Type-safe API client with SSE streaming
│
├── backend/                   # FastAPI, Python 3.11, async throughout
│   ├── main.py                # App entry point, middleware, lifespan
│   ├── config.py              # pydantic-settings reads from .env
│   ├── api/v1/routes/         # Route handlers (thin — logic lives in services)
│   │   ├── auth.py            # register, login, refresh, me
│   │   ├── conversations.py   # create conversation, send message (SSE)
│   │   └── agents.py          # generate, get, chat, versions, rollback
│   ├── models/
│   │   ├── orm.py             # SQLAlchemy tables: users, projects, conversations, agents
│   │   ├── schemas.py         # Pydantic request/response models
│   │   └── database.py        # async engine, get_db() dependency
│   ├── conversation/
│   │   ├── engine.py          # ConversationEngine — the core multi-turn loop
│   │   ├── dimensions.py      # The 8 RequirementDimension definitions
│   │   ├── prompts.py         # All system prompt strings as constants
│   │   └── spec_builder.py    # raw LLM output → validated AgentSpec
│   ├── generator/
│   │   ├── synthesizer.py     # AgentSpec JSON → LangGraph Python code
│   │   ├── validator.py       # AST parse + security checks on generated code
│   │   └── executor.py        # Write to disk, dynamically load, run agents
│   ├── agents/
│   │   ├── templates/         # Jinja2 .py.j2 templates (react, plan_execute, router, rag)
│   │   ├── tools/             # Tool factory functions (web_search, api_caller, etc.)
│   │   └── generated/         # Generated agent code lives here — one dir per agent UUID
│   └── core/
│       ├── auth.py            # JWT create/verify, get_current_user dependency
│       └── observability.py   # Langfuse tracing wrapper
│
├── docs/
│   ├── PROJECT.md             # Full project vision and architecture
│   ├── TECH_STACK.md          # Every tech decision with reasoning
│   └── REFERENCES.md          # Open source repos to study
│
├── nginx/nginx.conf           # Reverse proxy config
├── docker-compose.yml         # Full stack: postgres, redis, qdrant, backend, frontend, nginx
├── Makefile                   # dev, build, migrate, test, logs, clean targets
└── CLAUDE.md                  # This file
```

---

## Environment Variables

All configuration lives in `.env` at the project root. Never hardcode these values anywhere. Always read through `backend/config.py` using pydantic-settings.

```
# Required — the app will not start without these
ANTHROPIC_API_KEY=          # Your Anthropic API key
DATABASE_URL=               # postgresql+asyncpg://user:pass@localhost:5432/agentbuilder
REDIS_URL=                  # redis://localhost:6379/0
JWT_SECRET_KEY=             # Random 64-char string — generate with: openssl rand -hex 32

# Optional — observability (app works without these but observability is disabled)
LANGFUSE_PUBLIC_KEY=        # From cloud.langfuse.com or self-hosted
LANGFUSE_SECRET_KEY=        # From cloud.langfuse.com or self-hosted
LANGFUSE_HOST=              # https://cloud.langfuse.com (default) or self-hosted URL

# Optional — search tool for agents that need web search
TAVILY_API_KEY=             # From tavily.com — used by web_search tool in generated agents

# Infrastructure (set automatically by Docker Compose, override for local dev)
ENVIRONMENT=                # development or production
CORS_ORIGINS=               # http://localhost:3000,https://yourdomain.com
LOG_LEVEL=                  # DEBUG, INFO, WARNING, ERROR
```

---

## Critical Conventions

Read these carefully. They represent decisions made for good reasons — do not change them without understanding why.

### Async Everywhere in the Backend

Every route handler, database function, service method, and utility that does any I/O must be `async def` and must `await` I/O calls. The system handles many concurrent streaming connections. A single blocking call (like a sync database query or a `time.sleep()`) blocks the entire event loop and degrades all concurrent requests.

If you need to call a blocking function (e.g., `black` formatter via subprocess), use `asyncio.to_thread()` to run it in a thread pool without blocking the event loop.

### Route Handlers Are Thin

Route handlers in `api/v1/routes/` should do only three things: validate the request (FastAPI does this automatically via Pydantic), call a service or engine method, and return a response. Business logic belongs in `conversation/`, `generator/`, or dedicated service classes. A route handler longer than 30 lines is a signal that logic needs to move out.

### Generated Code Has Its Own Directory

Agent code generated by the synthesizer goes in `backend/agents/generated/{agent_uuid}/agent.py`. This directory is mounted as a Docker volume so it persists. Never write generated code anywhere else. The executor uses `importlib.import_module` to load agents dynamically — this only works because the `generated/` directory is on the Python path.

### SSE Streaming Format

All streaming endpoints return Server-Sent Events in this exact format — do not deviate from it because the frontend parser expects this structure:

```
data: {"type": "token", "content": "Hello"}\n\n
data: {"type": "progress", "step": "Analyzing spec..."}\n\n
data: {"type": "dimension_update", "coverage": {"purpose": true, "tools": false, ...}}\n\n
data: {"type": "spec_ready", "spec": {...}}\n\n
data: {"type": "done", "is_spec_ready": true}\n\n
```

The `type` field always tells the frontend what to do with the payload.

### The Conversation Engine Uses Tool Use for Spec Extraction

When the Conversation Engine detects that all eight dimensions are covered, it does NOT ask the LLM to embed JSON in its response text. Instead, it uses Anthropic's tool use feature: a tool called `confirm_agent_spec` is defined with a JSON schema matching the `AgentSpec` Pydantic model. The LLM is instructed to call this tool when ready to confirm. This produces reliable, schema-validated JSON every time.

The system prompt tells Claude: "When you have gathered sufficient information across all eight dimensions, call the confirm_agent_spec tool with the complete spec. Do not call this tool prematurely — make sure you have covered all dimensions."

### Security Rules for Generated Code

The code validator in `generator/validator.py` must run before any generated code is saved to disk. The following are hard blocks that cause the validator to reject the code:

- Any import of `os`, `subprocess`, `socket`, `sys`, `shutil`, or `pathlib`
- Any call to `eval()`, `exec()`, `__import__()`, or `compile()`
- Any string that contains a file path starting with `/etc/`, `/proc/`, or `/sys/`
- Any assignment to `__builtins__`

These checks exist because generated code runs on the same server as the backend. A prompt injection attack could theoretically cause the LLM to generate malicious code. These checks are the last line of defense.

### Database Access Pattern

Always use the `get_db()` dependency for database access in routes:

```python
# Correct pattern
@router.post("/conversations")
async def create_conversation(
    body: CreateConversationRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    conversation = Conversation(project_id=body.project_id, ...)
    db.add(conversation)
    await db.commit()
    await db.refresh(conversation)
    return conversation
```

Never create a new session manually inside a route handler. The dependency handles session lifecycle (open on request, close on response, rollback on error).

---

## The Eight Requirement Dimensions — Quick Reference

When modifying the Conversation Engine, keep these in mind. Each dimension maps to a field in `AgentSpec`.

| Dimension | AgentSpec Field | Default if Not Specified |
|---|---|---|
| Purpose | `purpose` | Required — no default |
| Tools Needed | `tools: list[str]` | `["none"]` |
| Memory Type | `memory_type` | `"conversational"` |
| LLM Preference | `llm_model` | `"claude-sonnet-4-6"` |
| Integration | `integration_type` | `"chat_embed"` |
| Escalation Rules | `escalation_config` | `{"trigger": "user_request"}` |
| Tone and Persona | `persona` | `"helpful and professional"` |
| Error Handling | `error_handling` | `"apologize_and_escalate"` |

---

## Workflow Type Selection Logic

The synthesizer in `generator/synthesizer.py` selects a template based on the spec. Here is the decision logic — do not change it without updating this documentation:

Use `react_agent` (the default, simplest) when: the agent has 0–3 tools, the purpose is a single domain (customer support, Q&A, data lookup), and there is no requirement for multi-step planning.

Use `plan_execute` when: the agent has 4+ tools, the purpose involves multi-step tasks described with words like "then," "after that," "finally," "analyze then write," or "research and report."

Use `router` when: the purpose covers multiple distinct domains mentioned explicitly (e.g., "handles both IT support AND HR queries," "routes between sales and billing").

Use `rag` when: `memory_type` is `"persistent"` OR the purpose mentions answering questions from documents, a knowledge base, or uploaded files.

---

## Common Mistakes and How to Avoid Them

**Forgetting `await` on database calls.** SQLAlchemy async sessions raise a confusing `greenlet` error when you call `session.execute()` without `await`. Every single database call in the backend is `await session.execute()`, `await session.commit()`, `await session.refresh()`.

**Using `json.loads()` on the spec before validating.** Always parse the spec through the `AgentSpec` Pydantic model: `AgentSpec.model_validate(raw_dict)`. This fills defaults and validates constraints. Raw `json.loads()` gives you an unvalidated dict.

**Blocking the event loop with Black formatter.** `subprocess.run()` is blocking. Call `await asyncio.to_thread(run_black_formatter, filepath)` instead.

**React Flow container without explicit height.** The workflow diagram `<ReactFlow>` component needs its parent div to have an explicit pixel height (e.g., `style={{ height: '500px' }}`). `height: 100%` without a parent height collapses to zero.

**Concatenating SSE chunks on the frontend.** SSE events arrive as separate chunks. The frontend SSE parser must handle each `data:` line as a complete JSON object, not concatenate chunks. Use the EventSource API or a streaming fetch with a proper line-by-line parser.

**Generated agent code importing the backend's modules.** Generated agents are standalone — they have their own dependencies. They must not import from `backend/` or use any of the backend's database sessions or config. If a generated agent needs a database connection, it gets its own connection string from environment variables.

---

## Running the Project

```bash
# First time setup
cp .env.example .env
# Fill in ANTHROPIC_API_KEY and JWT_SECRET_KEY in .env

# Start everything
make dev

# Apply database migrations (new terminal)
make migrate

# Run backend tests
make test

# View all logs
make logs

# Stop everything and remove volumes (destructive)
make clean
```

The frontend will be at `http://localhost` and the API docs at `http://localhost/api/docs`.

---

## When You're Stuck

If a generated file is producing unexpected output, check these things in order:

First, confirm the Pydantic model is being used for parsing (not raw dict access). Second, check that async/await is correct throughout the call chain. Third, look at the Langfuse dashboard to see the actual LLM prompt and response — this reveals most logic bugs in the Conversation Engine. Fourth, check the Docker logs with `make logs` for any import errors in dynamically loaded agent modules. Fifth, run the tests with `make test` — a failing test often points directly to the broken component.

If none of that helps, read the relevant reference implementation in `docs/REFERENCES.md` for the component you're working on.
