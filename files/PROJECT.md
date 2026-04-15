# Agent Builder — Project Vision & Architecture

## What We Are Building

Agent Builder is a **conversational, AI-powered platform that automatically designs and deploys AI agents** from a plain-language description. Instead of dragging blocks on a canvas or writing framework boilerplate, a user types what they want ("build me a customer support bot that handles refunds") and the system guides them through a structured conversation, gathers all necessary requirements, synthesizes a fully working LangGraph agent, and deploys it with a live API endpoint — in under 5 minutes.

The core insight is simple: **existing agent builders assume the user already knows what to build.** Langflow, n8n, and Flowise all start with a blank canvas. Our system starts with a conversation — it asks the right questions, fills in sensible defaults, and only builds once the spec is crystal clear. This is the "Socratic method" approach to agent creation.

---

## The Problem We Solve

Building an AI agent today requires a developer to: (1) choose a framework (LangGraph? CrewAI?), (2) manually wire tools, memory, and LLM config, (3) write boilerplate orchestration code, (4) set up deployment, (5) add observability. This takes days for someone experienced, weeks for a beginner.

Our platform collapses all of this into a guided conversation followed by automated code generation and one-click deploy. A non-developer product manager can describe an agent in plain English and get a working, tested, production-deployable agent back — without touching code.

---

## Core User Journey

When a user lands on the platform, they see a single chat input. They type their idea. The Conversation Engine (powered by Claude) starts asking clarifying questions — not a dumb static form, but an intelligent interviewer that infers obvious answers from context and only asks about genuinely ambiguous dimensions.

After 6 to 10 exchanges, the system has a complete **Agent Spec** — a structured JSON document describing every aspect of the agent. The user sees this spec displayed alongside the conversation and confirms it. Then they click "Generate Agent."

The Agent Generator reads the spec, selects the appropriate workflow template (ReAct for simple agents, Plan-and-Execute for complex multi-step ones, Router for multi-domain agents), renders it using Jinja2 templating, validates the code, and deploys it inside a Docker sandbox. The user gets back a live chat interface to test their agent immediately, plus a React Flow workflow diagram showing how the agent's logic is structured.

From that point, the user can iterate: edit the spec, re-generate, rollback to a previous version, or export the raw Python code to run themselves.

---

## The Eight Requirement Dimensions

The Conversation Engine gathers information across exactly eight dimensions. These are not arbitrary — they map directly to the configuration options in LangGraph and cover every decision that affects agent behavior.

**Purpose** is the most fundamental: what task should this agent accomplish? This drives the entire downstream architecture — a research agent needs different tools and memory than a customer support agent.

**Tools Needed** covers what capabilities the agent requires beyond pure LLM reasoning. Options include web search (via Tavily), REST API calling (generic HTTP tool), code execution (sandboxed Python), database lookup (configurable connection), and human handoff (escalation to a real person).

**Memory Type** is a three-way choice: no memory (each conversation is stateless), conversational memory (remembers within a single session using LangGraph's MemorySaver), or persistent memory (remembers across sessions using a vector store like Qdrant).

**LLM Preference** maps to model selection: fast maps to Claude Haiku or GPT-3.5, balanced to Claude Sonnet, powerful to Claude Opus or GPT-4o.

**Integration** decides how the generated agent is exposed: as an embeddable chat widget, a REST API endpoint, a webhook (receives POST requests and responds), or a Slack bot.

**Escalation Rules** defines when and how the agent hands off to a human: on explicit user request, when confidence is low, when a certain keyword is detected, or never.

**Tone and Persona** shapes the system prompt: formal/professional, friendly/casual, concise/brief, or a custom description.

**Error Handling** defines behavior when the agent cannot answer: apologize and escalate, try web search as fallback, return a structured error response, or ask the user to rephrase.

---

## System Architecture — High Level

The system has five logical layers that communicate in a defined sequence.

The **Frontend** is a Next.js 14 application with two main surfaces: the Build interface (chat + spec preview + workflow diagram) and the My Agents dashboard (agent cards, test interface, version history, generated code viewer). Real-time streaming between frontend and backend happens via Server-Sent Events (SSE).

The **Conversation Engine** is a FastAPI service that manages multi-turn dialogue using Claude as the underlying LLM with a carefully designed system prompt. It maintains conversation state in PostgreSQL (messages as a JSONB array), tracks which of the eight dimensions have been covered, and detects when the LLM signals that the spec is complete by watching for a `<SPEC_READY>` XML tag in the response.

The **Agent Generator** takes a confirmed AgentSpec JSON and produces working Python code. It uses Jinja2 templates — one per workflow type — and injects the spec values (tools list, system prompt, model name, memory config) into the template. The output code is validated with Python's `ast.parse()`, formatted with `black`, checked for dangerous imports, then written to disk.

The **Agent Runtime** is responsible for deploying and running generated agents. Each agent lives in its own subdirectory (`backend/agents/generated/{agent_id}/`) and is loaded dynamically using Python's `importlib`. Agents run with a LangGraph checkpointer for thread-level memory. The runtime exposes each agent via a `/chat` endpoint.

The **Observability Layer** uses Langfuse to trace every conversation turn, every generation event, and every agent interaction. This gives visibility into token usage, latency, errors, and agent quality over time.

---

## Data Flow — Step by Step

When a user sends their first message, the frontend `POST /api/v1/conversations` to create a conversation record, then `POST /api/v1/conversations/{id}/messages` with the message text. The backend loads the conversation history from PostgreSQL, constructs a prompt including the system instructions and all prior messages, calls the Anthropic API with streaming enabled, and SSE-streams the tokens back to the frontend as they arrive.

Every response from the LLM is scanned for the `<SPEC_READY>` marker. When detected, the backend parses the embedded JSON, validates it through the `AgentSpec` Pydantic model (filling defaults for any missing fields), saves it to `conversations.spec`, and updates `conversations.status` to `"confirmed"`. The frontend receives `is_spec_ready: true` in the SSE stream and shows the Generate button.

When the user clicks Generate, `POST /api/v1/agents/generate` is called with the `conversation_id`. The backend reads the spec, calls `AgentSynthesizer.synthesize()`, calls `AgentExecutor.deploy()`, saves the agent record to PostgreSQL, and streams progress updates back via SSE ("Analyzing spec..." → "Selecting template..." → "Generating code..." → "Deploying..." → "Ready!"). The frontend shows each step with an animated progress indicator.

---

## Database Schema

The system uses four PostgreSQL tables. The `users` table stores basic auth data: UUID primary key, email (unique), hashed password, and timestamps. The `projects` table groups agents by user: UUID, user_id foreign key, name, description, timestamps. The `conversations` table is the core of the build flow: UUID, project_id FK, messages stored as a JSONB array (each element has `role`, `content`, `timestamp`), spec stored as JSONB when confirmed, and a status enum (gathering → confirmed → building → complete). The `agents` table stores all deployment info: UUID, conversation_id FK, name, spec JSONB, generated_code TEXT, deployment_status enum (pending → deployed → failed), version integer (increments on each re-generate), endpoint_url, timestamps.

---

## Agent Workflow Types

The generator chooses between three LangGraph workflow patterns based on the spec's complexity signals.

**ReAct** (Reasoning + Acting) is the default for most agents. The graph has two nodes — `agent` and `tools` — and a conditional edge: after the LLM responds, if it called any tools the graph routes to `tools`, otherwise it ends. This handles the vast majority of use cases: customer support, Q&A bots, simple research assistants.

**Plan-and-Execute** is selected when the spec has multiple tools, complex multi-step tasks, or when the user described something like "analyze X then write a report then send it." The graph has `planner`, `executor`, `replanner`, and `final_response` nodes. The planner creates a structured step list, executor runs each step, replanner checks if the plan needs adjustment based on results.

**Router** is selected when the spec covers multiple distinct domains (e.g., "handles both IT support and HR queries"). The graph has a `router` node that classifies the input and routes to one of several specialized sub-agent nodes, each with their own tools and system prompts.

---

## Security Considerations

Generated agent code is never executed in the main backend process. It runs in an isolated subdirectory with dynamic imports that are validated before loading. The code validator checks for dangerous imports (`os.system`, `subprocess.call`, `eval`, `exec`) and rejects them. API keys for tools (like Tavily for web search) are passed via environment variables at runtime, never hardcoded in generated code.

JWT authentication protects all API endpoints except health check, login, and register. Tokens expire in 24 hours, refresh tokens in 7 days. Auth routes are rate-limited via Redis (5 attempts per minute per IP). All API keys are read from environment variables using `pydantic-settings`, never from code.

---

## Observability

Every Anthropic API call is wrapped in a Langfuse trace. Conversation turns are logged with token counts. Agent generation events include the template used, time taken, and any validation warnings. Agent run events include the input message, response, thread ID, latency, and token usage. All traces are tagged with `user_id` and `project_id` for easy filtering in the Langfuse dashboard.

In production, structured JSON logs are written to stdout. A Prometheus `/metrics` endpoint exposes HTTP request counts, request duration histograms, active agent count, and generation duration. An optional Grafana dashboard (included in `docker-compose.yml`) visualizes these metrics.

---

## Deployment Model

Local development uses Docker Compose with hot-reload enabled for both frontend and backend. The stack includes: PostgreSQL 16, Redis 7, Qdrant (vector store), the FastAPI backend, the Next.js frontend, and Nginx as a reverse proxy routing `/` to frontend and `/api/` to backend.

For production, the same Docker Compose file works on any Linux VPS or cloud VM. The Nginx config handles SSL termination when used with Certbot. For cloud deployment, the stack maps cleanly to: AWS RDS for PostgreSQL, ElastiCache for Redis, a Qdrant Cloud instance, and two ECS tasks (backend + frontend) behind an ALB. However, the entire stack can run on a single `t3.medium` for early-stage usage.

---

## What Makes This Different From Existing Tools

The existing tools fall into two camps. **Visual builders** like n8n, Langflow, and Flowise give you a canvas to drag blocks on. They are powerful but require the user to already know what they want to build and how to wire it. **Code frameworks** like LangGraph, CrewAI, and LangChain give developers full control but require deep framework knowledge and significant boilerplate.

Our system is the first to start from **requirements**, not from a canvas or code. The conversation-first approach means that even a non-technical user can describe their goal in plain English and get a working agent. The generated output is real, inspectable, exportable LangGraph code — not a locked-in visual config. Users can graduate from our platform to maintaining the generated code themselves if they choose.

The combination of intelligent requirement gathering + code generation + one-click deployment + observability in a single open-source, self-hostable package is the differentiated position.
