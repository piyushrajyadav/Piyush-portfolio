# Agent Builder — Open Source References & Research

## How to Use This Document

This document lists every open source project you should study before and during building Agent Builder. For each one, the goal is not to copy wholesale but to **understand the patterns** — how they handle state, how they structure their APIs, how they do streaming, what problems they ran into. Reading production code from successful projects will save you weeks of trial and error.

The repos are organized by what you should learn from each one, not by popularity.

---

## Tier 1 — Study These Deeply (Code-Level Understanding)

These three repos should be read carefully — not just the README, but the actual source code. They are your primary teachers.

### 1. Dograh — `github.com/dograh-hq/dograh`

This is the repo your CEO shared. Dograh is an open-source voice agent platform (alternative to Vapi). It is **not** the same category as what you're building — Dograh is about voice agents specifically, not a meta-system for building agents. However, the reason to study it deeply is its **production-grade FastAPI + Docker + streaming architecture**.

What to study specifically: look at how `api/` is structured — they separate routes cleanly and use dependency injection throughout. Look at `docker-compose.yaml` to understand how they wire multiple services together in production. Look at how they handle real-time streaming (they use WebSockets for voice, you'll use SSE for text — but the patterns are similar). Their `.claude/` directory is interesting — it contains Claude Code context files that show you how they configure Claude Code for their own development.

What to borrow: the overall FastAPI project structure, the Docker Compose service wiring pattern, and the way they handle environment-based configuration.

What NOT to borrow: anything voice-specific (Pipecat, WebRTC, Twilio telephony config). That entire stack is irrelevant to your use case.

GitHub: `https://github.com/dograh-hq/dograh`

### 2. Langflow — `github.com/langflow-ai/langflow`

Langflow is the most mature open-source visual agent builder. It is Python + React, uses LangChain under the hood, and has been in production for over a year with thousands of users. This is your closest competitor in terms of what it does, even though your approach (conversational vs. visual) is fundamentally different.

What to study: their `backend/` directory — specifically how they represent a "flow" as a graph data structure stored in the database, how they dynamically load and execute components, and how they handle errors during execution. Their `frontend/` shows how to render a React Flow workflow diagram from an agent configuration. Their `alembic/` migrations show real-world database schema evolution patterns.

What to borrow: the concept of storing agent workflow as a JSON graph in the database (their `Flow` model is a good reference), the React Flow integration patterns for rendering agent graphs, and the way they expose a `/build` API that streams execution progress.

What NOT to borrow: their component registry system — it's massive and designed for extensibility beyond what you need. Start simpler with your template-based approach.

GitHub: `https://github.com/langflow-ai/langflow`
Docs: `https://docs.langflow.org`

### 3. OpenHands (formerly OpenDevin) — `github.com/All-Hands-AI/OpenHands`

OpenHands is an AI software engineering agent. It is not an agent builder, but it is one of the most sophisticated production LangGraph implementations available as open source. The reason to study it is that it solves hard problems you will encounter: sandboxed code execution, long-running agent state management, streaming intermediate steps to the frontend, and recovering from agent errors gracefully.

What to study: their `agenthub/` directory shows multiple agent architectures (CodeAct, Planner, Monologue) side by side — seeing the same problem solved three different ways builds intuition. Their `runtime/` directory shows sandboxed execution patterns. Their `server/` shows how to handle long-running async tasks with real-time streaming.

What to borrow: the pattern of streaming agent "thoughts" and "actions" as separate event types to the frontend (so users can see what the agent is doing at each step), the sandboxed execution model for running generated code safely, and the approach to agent state serialization for persistence.

GitHub: `https://github.com/All-Hands-AI/OpenHands`

---

## Tier 2 — Read the Architecture, Study Key Files

These repos are important for specific subsystems. You don't need to read all the code, but you should understand their architecture and look closely at the files relevant to what you're building.

### 4. LangGraph — `github.com/langchain-ai/langgraph`

LangGraph is the core framework your generated agents will be built on. You're not building LangGraph — but you're generating code that uses it, so you need to understand it at source-code level, not just from the docs.

What to study: `langgraph/graph/state.py` — this is how LangGraph represents a stateful workflow as a graph. Understanding this makes writing your Jinja2 templates much easier because you'll know exactly what code you're generating. `langgraph/checkpoint/memory.py` — the MemorySaver implementation, which is what you'll use for conversational memory in generated agents. The `examples/` directory has 30+ ready-made agent patterns that are a goldmine for your template library.

Key insight from reading the source: LangGraph's `StateGraph` takes a TypedDict for state, nodes are just Python functions that take state and return a dict of updates, and edges are either direct or conditional based on a routing function. Your templates will generate exactly this structure.

GitHub: `https://github.com/langchain-ai/langgraph`
Examples: `https://github.com/langchain-ai/langgraph/tree/main/examples`

### 5. n8n — `github.com/n8n-io/n8n`

n8n is a low-code workflow automation platform with a node-based UI. It is one of the most well-engineered open source TypeScript projects available. Even though your frontend will use Next.js (not Vue like n8n), and your backend is Python (not Node), n8n is valuable to study for two specific things.

What to study: their React Flow workflow visualization — specifically `packages/editor-ui/src/components/Node.vue` and how they translate an internal workflow definition (JSON) into a visual graph. Also study their concept of "node credentials" — this is analogous to your tool configuration (how you attach API keys and config to specific tools). Their webhook execution model (`packages/workflow/src/WorkflowExecute.ts`) shows a mature pattern for running a workflow definition as actual code.

What to borrow: the general UI pattern of a workflow canvas next to an execution log, the concept of "sticky notes" on the canvas to explain parts of a workflow (useful for your workflow viewer to annotate the generated agent graph), and the credential (tool config) storage pattern.

GitHub: `https://github.com/n8n-io/n8n`

### 6. Langfuse — `github.com/langfuse/langfuse`

Langfuse is the observability platform you'll integrate. But more importantly, their backend code shows how to build a tracing system for LLM applications from scratch — which is useful background even if you're using their hosted or self-hosted version.

What to study: the `backend/src/features/traces/` directory — this shows how they model a trace (a session), a generation (a single LLM call), and a span (any tracked operation). Understanding this helps you instrument your own code correctly. Their `worker/` directory shows how they handle high-volume async event ingestion without blocking API responses.

What to borrow: their exact SDK usage patterns for Python (`langfuse.trace()`, `.generation()`, `.span()`) — your `backend/core/observability.py` should follow their recommended patterns closely.

GitHub: `https://github.com/langfuse/langfuse`
Python SDK docs: `https://langfuse.com/docs/sdk/python`

### 7. Flowise — `github.com/FlowiseAI/Flowise`

Flowise is another visual LLM flow builder, similar to Langflow but built in TypeScript/Node.js. Its value for your project is specifically the **chat widget** and **agent testing interface** that they've open-sourced.

What to study: `packages/ui/src/views/chatmessage/` — this is a production-grade chat UI component with streaming support. Your frontend chat interface should be inspired by this design. Their `packages/server/src/utils/buildChatflow.ts` shows the exact pattern of loading a saved agent config and executing it against a user message.

What to borrow: the embedded chat widget design (you'll build your own but look at theirs for the feature set), the approach to thread management (how they separate different conversation threads per agent), and the pattern of showing "source documents" in chat responses when using RAG.

GitHub: `https://github.com/FlowiseAI/Flowise`

---

## Tier 3 — Reference When You Hit Specific Problems

These are specialized repos you'll want to reference when building specific features. You don't need to study them upfront — bookmark them and come back when relevant.

### 8. FastAPI Full Stack Template — `github.com/fastapi/full-stack-fastapi-template`

This is the official FastAPI team's reference architecture for a production full-stack app. It covers SQLAlchemy async patterns, Alembic migrations, JWT auth, and testing setup — exactly the patterns you need for your backend foundation.

Use this when: setting up your authentication system, structuring your SQLAlchemy models, and configuring Alembic for async migrations.

GitHub: `https://github.com/fastapi/full-stack-fastapi-template`

### 9. CrewAI — `github.com/crewAIInc/crewAI`

CrewAI is a framework for building multi-agent "crews" where each agent has a defined role, goal, and backstory. You're generating LangGraph code rather than CrewAI code, but their **agent role/persona model** is excellent design that should influence how you structure the Tone and Persona dimension of your spec.

Use this when: designing how persona and role information gets injected into generated system prompts.

GitHub: `https://github.com/crewAIInc/crewAI`

### 10. Pydantic AI — `github.com/pydantic/pydantic-ai`

Pydantic AI is a newer agent framework from the Pydantic team. Its primary value for your project is the **structured output** patterns — specifically how to reliably get an LLM to return valid JSON conforming to a Pydantic schema. This is critical for your Conversation Engine: when the bot finishes gathering requirements, it needs to output a valid AgentSpec JSON reliably.

Use this when: implementing the spec extraction step in the Conversation Engine — specifically looking at their `result_type` parameter pattern which forces structured output.

GitHub: `https://github.com/pydantic/pydantic-ai`

### 11. Chroma DB Python Client — `github.com/chroma-core/chroma`

If you decide to add RAG capabilities to generated agents (letting an agent answer questions from a knowledge base), Chroma is the simplest vector store to set up. Study their `chromadb/api/` directory to understand the collection/document/embedding model.

Use this when: implementing the `rag_agent.py.j2` template that includes a vector memory tool.

GitHub: `https://github.com/chroma-core/chroma`

---

## Key Papers and Articles to Read

These are not code but conceptual foundations. Read them before writing the Conversation Engine prompts — they will directly improve the quality of your system prompt design.

**ReAct: Synergizing Reasoning and Acting in Language Models** (Yao et al., 2022) — this is the foundational paper for the ReAct agent pattern. Understanding why it works (interleaving reasoning steps with action steps) helps you write better system prompts for your generated agents. Available at `arxiv.org/abs/2210.03629`.

**Reflexion: Language Agents with Verbal Reinforcement Learning** (Shinn et al., 2023) — this paper introduces the idea of agents learning from their mistakes within a single session by reflecting on what went wrong. Directly applicable to your Plan-and-Execute template's replanning step. Available at `arxiv.org/abs/2303.11366`.

**Tree of Thoughts: Deliberate Problem Solving with Large Language Models** (Yao et al., 2023) — important for understanding when a simple ReAct loop is insufficient and a more structured planning approach is needed. Helps you decide when to use Plan-and-Execute vs. ReAct in your spec-to-template mapping.

**Building Production-Ready RAG Applications** — LlamaIndex blog post series at `blog.llamaindex.ai`. Covers chunking strategies, retrieval quality, and evaluation — directly useful when implementing the RAG agent template.

---

## API Documentation to Bookmark

These are the primary API references you'll consult daily during development.

Anthropic Claude API: `https://docs.anthropic.com/en/api/messages` — specifically the streaming messages endpoint and the structured output (tool use) pattern for forcing JSON output from the Conversation Engine.

LangGraph API Reference: `https://langchain-ai.github.io/langgraph/reference/graphs/` — your generated code templates will use `StateGraph`, `add_node`, `add_edge`, `add_conditional_edges`, and `compile`. Know these four methods deeply.

FastAPI Documentation: `https://fastapi.tiangolo.com/advanced/` — specifically the "Advanced" section covering background tasks, WebSockets (even though you're using SSE), dependency injection scopes, and middleware.

Langfuse Python SDK: `https://langfuse.com/docs/sdk/python/decorators` — the decorator-based approach (`@observe`) is the cleanest way to add tracing to your functions. Read this before writing `backend/core/observability.py`.

React Flow (XYFlow): `https://reactflow.dev/docs/` — you'll use `useNodesState`, `useEdgesState`, and custom node types to render your workflow diagram. The "Custom Nodes" guide is particularly important.

---

## What NOT to Use (and Why)

Some tools seem relevant but should be avoided for specific reasons.

**AutoGen (Microsoft)** is a powerful multi-agent framework but its programming model is fundamentally different from LangGraph — agents communicate via conversational messages rather than graph state updates. Mixing AutoGen patterns with LangGraph templates will cause confusion. Pick one paradigm (LangGraph) and stay consistent.

**LangChain Agents (legacy)** — the older `AgentExecutor` class from LangChain (not LangGraph) is being deprecated. All new code and templates should use LangGraph's `StateGraph` instead. If you see examples using `initialize_agent()` or `AgentExecutor`, those are the old patterns — ignore them.

**Zapier/Make** — these are no-code automation platforms that expose AI features but are entirely closed-source and cloud-only. They're useful competitive references for understanding the user experience of the market, but there is nothing technically borrowable.

**Semantic Kernel (Microsoft)** — deeply tied to the Microsoft Azure ecosystem. Unless you're building for Azure-first deployment, the patterns will add unnecessary complexity.
