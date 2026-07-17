# Minich AI Platform

An API-only Next.js service for reusable, versioned AI Skills. Its first live
consumer is [SocraticCoachAI.com](https://socraticcoachai.com), which calls this
service for CMU CS Academy CS1 tutoring.

The platform intentionally owns tutor behavior, OpenAI access, rate limits, and
usage metering. Consumer websites own their user interface and product-specific
data.

## What is live

- `POST /api/chat` — authenticated Unit 1 Socratic tutor
- Per-consumer API keys stored as SHA-256 hashes
- Per-consumer sliding-window rate limits in Upstash Redis
- Monthly request, success, failure, and token counters in Upstash Redis
- `GET /api/usage` — each consumer can inspect its own usage
- Unit 1 Skill, teacher-authored knowledge, and behavior tests
- Unit 2 Skill and routing scaffolding (not yet wired into `/api/chat`)

There is deliberately no chat page in this repository. The public interface is
maintained in `cminich/socratic-coach-ai-website`.

## Repository layout

```text
app/api/             # Authenticated HTTP endpoints
lib/                 # Auth, metering, prompts, retrieval, and skill loading
skills/education/    # Versioned Skills, tests, and knowledge
evals/               # Manual regression prompts
docs/                # Authoring and model-selection notes
scripts/             # Local key-generation utilities
```

`next.config.ts` includes the Markdown skill assets in Vercel's `/api/chat`
function bundle. Keep that tracing configuration when reorganizing Skills.

## Local setup

Requirements: Node.js 18+ and an OpenAI API key.

```bash
npm install
cp .env.example .env.local
npm run keys:generate
```

Copy the generated hashes into the platform `.env.local`. Put the plaintext
`fakeclient1` key in the website's `CS1_TUTOR_API_KEY`; keep `fakeclient2` for
manual client testing. Never commit plaintext keys.

The Vercel Upstash integration supplies `KV_REST_API_URL` and
`KV_REST_API_TOKEN`. Pull them locally with:

```bash
vercel env pull .env.local --yes
```

Then run:

```bash
npm run dev
npm test
```

## Calling the API

```bash
curl https://minich-ai-platform.vercel.app/api/chat \
  -H "Authorization: Bearer $FAKECLIENT2_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Why is my rectangle invisible?"}]}'
```

Missing or invalid keys receive `401`. Consumers over the default 20 requests
per rolling minute receive `429` with `X-RateLimit-*` headers.

## Inspecting usage

A consumer key can read only its own current-month counters:

```bash
curl https://minich-ai-platform.vercel.app/api/usage \
  -H "Authorization: Bearer $FAKECLIENT2_API_KEY"
```

Add `?month=2026-07` for another month. The private metering admin key can query
a named consumer with `?consumer=fakeclient1`.

Counters are retained for 400 days and include:

- authorized chat requests
- successful and failed OpenAI calls
- prompt, completion, and total tokens

These counters are suitable for learning and fake invoices. A real billing
system should later use an append-only SQL ledger rather than Redis as its sole
source of truth.

## Environment variables

Platform:

- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `API_CONSUMER_KEY_HASHES`
- `METERING_ADMIN_KEY_HASH`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `RATE_LIMIT_REQUESTS_PER_MINUTE`

Website consumer:

- `CS1_TUTOR_API_KEY`
- `CS1_TUTOR_API_URL` (optional override)

## Deployment

The Vercel project `minich-ai-platform` deploys automatically from
`minich-ai/minich-ai-platform` on pushes to `main`. The Upstash Redis resource
must remain connected to that Vercel project.
