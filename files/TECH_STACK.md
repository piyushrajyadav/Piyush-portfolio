# Agent Builder — Tech Stack Decisions

## How to Read This Document

Every technology decision here comes with a reason. When someone asks "why FastAPI and not Express?" or "why LangGraph and not CrewAI?", the answer is in this file. Understanding the reasoning also helps when something isn't working — you know what the technology was chosen for, so you know where to look for alternatives.

---

## Frontend

### Next.js 14 with App Router

Next.js is chosen over plain React, Vite, or Remix for one primary reason: **Server Components and native streaming support**. The conversation and agent generation features both involve long-running streaming responses from the backend. Next.js App Router handles Server-Sent Events and streaming responses at the framework level, making the implementation cleaner than setting up custom streaming in a plain React SPA.

The App Router (not the older Pages Router) is specifically important because it supports React's `Suspense` boundaries natively, which allows showing loading states for different parts of the UI independently — useful when the workflow diagram is loading separately from the chat history.

Next.js also gives you API routes at `/api/*` which you could use for lightweight BFF (Backend for Frontend) patterns without spinning up a separate Node.js server. This may not be needed early on, but the capability exists.

Version to use: `14.x` with TypeScript strict mode enabled.

### TypeScript with Strict Mode

TypeScript is not optional for this project. The frontend deals with several complex data structures: `AgentSpec` JSON with many nested fields, SSE event payloads with multiple possible shapes depending on the event type, and React Flow node/edge definitions. Without TypeScript, these will produce runtime errors that are hard to debug. With strict TypeScript, the compiler catches shape mismatches at build time.

Strict mode means `"strict": true` in `tsconfig.json`. This enables `noImplicitAny`, `strictNullChecks`, and several others. Accept that you will write slightly more code — the benefit in caught bugs is worth it.

### Tailwind CSS

Tailwind is chosen over plain CSS, CSS Modules, or styled-components because this project will be developed with Claude Code assistance, and Tailwind's utility class syntax is well-understood by Claude — it can generate accurate, idiomatic Tailwind much more reliably than it can generate correct CSS-in-JS syntax. The practical benefit is faster iteration.

One pattern to establish early: create a `cn()` utility function (combining `clsx` and `tailwind-merge`) that you use for all conditional class names. This avoids the most common Tailwind pitfall of conflicting utilities not being resolved correctly.

### React Flow (`@xyflow/react`)

React Flow is the industry standard for node-based graph UIs in React. Langflow, n8n, and Flowise all use it. It handles the canvas, zoom/pan, edge routing, and custom node rendering — all things that would take months to build from scratch.

The specific thing you need from React Flow is **custom node types** — your workflow diagram has three kinds of nodes (LLM/agent nodes in blue, tool nodes in amber, start/end nodes in green) and React Flow's `nodeTypes` prop lets you define exactly how each renders.

Important: React Flow requires a container with explicit dimensions (a fixed height `div`). This is a common gotcha — if you give it `height: 100%` in a flex container without an explicit parent height, the canvas will collapse to zero height.

### Lucide React for Icons

Lucide React is the cleaner successor to Feather Icons. It has a consistent design language across all icons, ships as individual components (so tree-shaking works), and has TypeScript types built in. Use this instead of heroicons, font-awesome, or others — the codebase needs one icon library, not three.

---

## Backend

### Python 3.11+

Python is the only realistic choice for the backend because every library you need — Anthropic SDK, LangGraph, LangChain, Langfuse, SQLAlchemy async — is Python-first. The TypeScript/Node versions of these libraries are secondary citizens with fewer features and slower updates.

Python 3.11 specifically because it introduced significant performance improvements (10-60% faster than 3.10 in benchmarks) and better error messages. These matter for a service that will run LLM inference in async loops.

### FastAPI

FastAPI is chosen over Flask, Django, and Express (Node) for three reasons specific to this project.

First, it has **native async support** via `asyncio`. All your hot paths — calling the Anthropic API, reading from the database, streaming SSE responses — are I/O-bound operations. FastAPI's async request handlers mean you can handle many concurrent requests without thread pool exhaustion.

Second, it has **automatic request validation via Pydantic**. Your API receives complex JSON bodies (conversation messages, agent specs). FastAPI automatically validates these against your Pydantic models and returns structured 422 errors if validation fails. This saves you from writing validation boilerplate.

Third, it generates **OpenAPI documentation automatically**. Navigate to `/docs` on your running server and you have an interactive API explorer. This is invaluable when the frontend developer (or Claude Code) needs to know exactly what an endpoint accepts and returns.

### SQLAlchemy 2.x (Async Mode) + asyncpg

SQLAlchemy is the ORM. Version 2.x is important — the async API changed significantly from 1.4 and the new style is much cleaner. All database operations must use the async versions (`async_session`, `await session.execute()`) because FastAPI's async request handlers cannot call blocking database code.

asyncpg is the underlying PostgreSQL driver. It is significantly faster than psycopg2 in async contexts because it is built natively for asyncio without a sync-to-async wrapper. Use `postgresql+asyncpg://` as the database URL prefix.

The pattern to follow: define models in `models/orm.py` using declarative style, generate migrations with Alembic, and always access the database through the `get_db()` dependency in route handlers.

### Alembic for Migrations

Alembic is SQLAlchemy's migration tool. It tracks the history of schema changes, generates migration scripts from model differences, and applies them in order. This is how you evolve your database schema safely in production without losing data.

A critical setup detail: the Alembic `env.py` must be configured for async migrations (using `run_async_migrations()` pattern). The default Alembic template generates sync code that will fail with async SQLAlchemy. Look at the FastAPI Full Stack Template reference in `REFERENCES.md` for the correct async env.py pattern.

### Pydantic v2

Pydantic is used throughout the backend for data validation and serialization. Version 2 (not 1.x) is significantly faster due to a Rust core. The API changed slightly from v1 — validators use `@field_validator` instead of `@validator` — so when you look at older examples online, make sure you're reading v2 docs.

The `AgentSpec` model is your most important Pydantic model. It should use validators to fill sensible defaults (e.g., if `memory_type` is not specified, default to `"conversational"`), normalize values (map `"fast"` → `"claude-haiku-4-5"`, `"balanced"` → `"claude-sonnet-4-6"`, `"powerful"` → `"claude-opus-4-6"`), and validate cross-field constraints (e.g., if `integration_type` is `"slack"`, then `escalation_rules` cannot be `"none"`).

### Anthropic Python SDK

The official `anthropic` Python package is the client for Claude. The key pattern you need is **streaming messages** — the conversation endpoint must stream tokens back to the frontend as they arrive, not wait for the complete response. The SDK supports this with `.stream()` and async generators.

For the spec extraction step (forcing Claude to output valid JSON), use the **tool use / structured output pattern**: define a tool with a JSON schema matching your `AgentSpec` model and instruct the LLM to call that tool when the spec is ready. This is more reliable than asking the LLM to embed JSON in its response and then parsing it with string operations.

SDK version: `anthropic>=0.34.0` for the latest structured output features.

### LangGraph

LangGraph is the framework your generated agents will use. It is not used for the Conversation Engine itself (which is a direct Anthropic API call) — LangGraph is specifically what the code synthesizer outputs.

Why LangGraph over CrewAI or bare LangChain? LangGraph's state machine model maps directly to how production agents actually behave: they have state (the conversation so far, the results of tool calls, intermediate reasoning), they make decisions at conditional edges, and they can loop (tools → agent → tools → agent) until a condition is met. This explicit graph structure is easier to reason about, debug, and extend than the "magic" of higher-level abstractions.

Specifically, the `StateGraph` with a `TypedDict` state type means the generated code is fully type-checkable. Your validator can confirm that the generated code defines a proper `State` type and uses it correctly.

Version: `langgraph>=0.2.0` for the stable 1.x API.

### Redis

Redis serves two purposes in the system. First, it stores **session state** during active conversations — the list of dimension coverage flags (which of the eight dimensions have been collected), the current conversation status, and temporary data that doesn't need to persist to PostgreSQL. Redis's TTL feature means this session data auto-expires after 24 hours.

Second, Redis is used for **rate limiting** on auth endpoints. Each login attempt increments a counter keyed by IP address. The counter expires after 60 seconds (using Redis TTL). This is the simplest possible distributed rate limiter.

Use the `redis[asyncio]` package (which includes `aioredis`) for async Redis access that works with FastAPI's async handlers.

### Qdrant

Qdrant is the vector database for agents that use persistent memory (the `rag_agent` template). When a user's spec includes `memory_type: "persistent"`, the generated agent code will embed user messages and store/retrieve them from Qdrant.

Why Qdrant over Pinecone, Weaviate, or pgvector? Qdrant is self-hostable with a Docker image, has a clean Python client, and has good performance at the scale this system will operate at. pgvector (PostgreSQL extension) is simpler but has limitations with approximate nearest neighbor search at larger scales. Pinecone is cloud-only which adds a dependency and cost.

Use the `qdrant-client` Python package. The key operations are: create a collection (once per agent), upsert vectors (on each user message), and query vectors (on each new message to retrieve relevant history).

---

## Infrastructure

### PostgreSQL 16

PostgreSQL is the primary database for all persistent data: users, projects, conversations, agents. The specific features you're using that make PostgreSQL the right choice (over MySQL or SQLite) are:

JSONB columns for storing `messages` (conversation history) and `spec` (agent configuration). JSONB allows you to query inside the JSON — for example, you can query all agents whose spec includes web_search as a tool with a PostgreSQL JSONB path expression. This is more efficient than storing JSON as TEXT and parsing it in Python.

UUID primary keys work natively in PostgreSQL without any extension. This is important because agent IDs need to be globally unique and non-guessable.

Enum types for `conversation.status` and `agent.deployment_status`. PostgreSQL enums enforce valid values at the database level, not just in application code.

Use version 16 (latest stable). The `postgres:16-alpine` Docker image is small and well-maintained.

### Docker Compose

Docker Compose is the deployment model for both local development and production. The entire system — Postgres, Redis, Qdrant, backend, frontend, Nginx — should start with a single `docker-compose up` command.

The key design decision is **volumes**: PostgreSQL data, Redis data, and Qdrant storage are all mounted as named volumes so they persist across container restarts. Generated agent code is mounted from the host into the backend container so it can be inspected and debugged directly.

Use Docker Compose v2 syntax (the `services:` top-level, no `version:` field). The `depends_on:` with `condition: service_healthy` is important — the backend should not start until Postgres and Redis pass their healthchecks.

### Nginx

Nginx acts as the reverse proxy, handling all incoming traffic and routing it to either the frontend or backend. This is necessary because browsers enforce same-origin policy — having a single entry point at `http://localhost` (or your domain) that proxies to the correct service avoids CORS issues.

The routing rule is simple: requests to `/api/*` go to the backend at `backend:8000`, all other requests go to the frontend at `frontend:3000`. The Nginx config also handles WebSocket upgrade headers (needed for SSE), enables gzip compression, and sets sensible `client_max_body_size` limits.

In production with HTTPS, Certbot runs alongside Nginx to auto-renew SSL certificates. The Nginx config gets an additional `server` block for HTTPS on port 443 with the certificate paths.

### Langfuse for Observability

Langfuse is the LLM observability platform. It is open source, self-hostable, and has a first-class Python SDK. You can use their cloud version (`cloud.langfuse.com`) for free during development and switch to self-hosted for production if needed.

Every Anthropic API call in the system should be wrapped in a Langfuse trace. The SDK's `@observe` decorator is the cleanest way to do this — add it to any function that calls the LLM and Langfuse automatically captures the input, output, token usage, and latency.

Why this matters: when a generated agent produces a bad response, Langfuse lets you inspect exactly what the LLM received (the full system prompt + conversation history), what it returned, and how many tokens it used. Without this, debugging agent quality issues is nearly impossible.

---

## Code Generation Tooling

### Jinja2 for Code Templates

Jinja2 is used to render agent code templates. Each template is a `.py.j2` file that looks like valid Python with `{{ variable }}` substitutions and `{% for tool in tools %}` loops for the tool list.

The important design principle: templates should be **minimal and readable**. The goal is to generate code that a developer could understand and maintain themselves. Templates should not be so abstracted that the output is unreadable. When in doubt, generate explicit, verbose code over clever compact code.

### Black for Code Formatting

After rendering a template, run `black` on the generated code before saving it. This ensures the generated output is consistently formatted regardless of how the template was rendered. It also catches certain categories of syntax errors because Black will error on malformed Python.

Run Black via subprocess in the synthesizer: `subprocess.run(["black", "--check", filepath])`. If Black fails, return a warning in the `SynthesisResult`.

### AST Validation

Python's built-in `ast.parse()` function parses Python source code into an abstract syntax tree and raises `SyntaxError` if the code is invalid. After rendering a template, always run `ast.parse(generated_code)` as the first validation step. This is fast (microseconds) and catches the most obvious generation errors.

Beyond syntax checking, walk the AST to look for dangerous nodes: `ast.Exec`, `ast.Import` with module names in a blocklist (`os`, `subprocess`, `socket`), and `ast.Call` where the function name is `eval` or `exec`. Reject any generated code that contains these.

---

## Authentication

### JWT with python-jose

JSON Web Tokens are used for stateless authentication. The `python-jose[cryptography]` package handles JWT signing and verification. Access tokens expire in 24 hours, stored in an `httpOnly` cookie on the frontend (not localStorage, to protect against XSS). Refresh tokens expire in 7 days and are also stored as `httpOnly` cookies.

Why `httpOnly` cookies over Authorization headers? For a web app where the frontend and backend share a domain (both behind Nginx), `httpOnly` cookies are simpler — the browser automatically sends them with every request, and JavaScript cannot read them (XSS protection). The downside is that the API is not easily usable from curl or Postman during development — you may want a `Bearer` token option in development mode.

### passlib with bcrypt

For password hashing, `passlib[bcrypt]` is the standard choice. Never store plaintext passwords or use MD5/SHA1. bcrypt is slow by design — it adds ~100ms per hash check, which is acceptable for login but too slow for per-request auth checks (use JWT for those instead).

---

## Testing

### pytest with pytest-asyncio

All backend tests use pytest. The `pytest-asyncio` plugin enables testing async functions directly with `async def test_...`. This is necessary because your route handlers, database functions, and engine methods are all async.

The testing strategy has three levels: unit tests for pure logic (like `spec_builder.py`), integration tests that use a real test database (using a separate `TEST_DATABASE_URL` that points to a test schema), and end-to-end tests that test the full HTTP request/response cycle using `httpx.AsyncClient` with the FastAPI app.

Critical: use `pytest.ini` or `pyproject.toml` to set `asyncio_mode = "auto"` so you don't need to decorate every async test with `@pytest.mark.asyncio`.

### Factories for Test Data

Create a `backend/tests/factories.py` file with functions that create valid test data: `make_user()`, `make_project()`, `make_conversation()`, `make_agent_spec()`. These factories have sensible defaults but accept keyword arguments to override specific fields. Using factories means your test setup code is concise and you can focus each test on the specific behavior being tested.
