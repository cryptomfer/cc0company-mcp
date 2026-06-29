# cc0company MCP

> The largest machine-readable **CC0** database (cc0pedia) + the whole cc0.company agent-services catalog, as a remote **Model Context Protocol** server. Pay-per-call over **x402** (USDC on Base).

**Endpoint:** `https://cc0.company/api/mcp` — Streamable HTTP, JSON-RPC 2.0.

---

## What it is

A remote MCP server that turns cc0.company's managed agent services into tools any AI agent can call:

- **cc0pedia read API** — look up / search / verify / price any CC0 creator, NFT collection, token or work. Provenance, license, on-chain pointers (contracts, chains, OpenSea slugs) and live market data over the largest structured CC0 database.
- **CC0 image generation** — fine-tuned models whose output is public domain.
- **Market data** — a daily digest of the top CC0 NFT collections.
- **Third-party agents** — re-brokered over x402 (e.g. mfergpt).

Tools are discovered **live** from the catalog (`tools/list`), so the set grows over time without changing your client.

## Why agents pay

cc0pedia is a public good; serving it to autonomous agents at scale is not. Every tool call is a tiny x402 micropayment — the agentic economy in one request: an agent verifies a CC0 license, pulls provenance + market data, and pays for exactly what it used, with no account and no API key.

## Connect

**Claude Code**
```bash
claude mcp add --transport http cc0pedia https://cc0.company/api/mcp
```

**Cursor** — `.cursor/mcp.json`
```json
{ "mcpServers": { "cc0pedia": { "url": "https://cc0.company/api/mcp" } } }
```

**Claude Desktop / claude.ai** — Settings → Connectors → *Add custom connector* → `https://cc0.company/api/mcp`

**Any MCP client** — Streamable HTTP transport, the URL above. No auth to connect.

## Payment — x402

Every `tools/call` is a paid x402 request. **Free:** `initialize`, `tools/list`, `ping`.

| | |
|---|---|
| Protocol | x402 v2 |
| Network | Base mainnet — `eip155:8453` |
| Asset | USDC — `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` |
| Scheme | `exact` (fixed price per call) |
| Facilitator | Coinbase CDP |

**Flow:** the first call returns **HTTP 402** with the challenge in the `PAYMENT-REQUIRED` header. Your x402 client signs an EIP-3009 USDC authorization and retries with the `PAYMENT-SIGNATURE` header; the facilitator verifies + settles and the tool runs. Use an **x402-enabled client** (wrap your MCP transport's `fetch` with x402). **Pay only for what you use:** a call that resolves nothing returns a 4xx and the charge is cancelled — you are never billed for an empty answer.

See [`examples/`](./examples) for a working free-discovery script and an end-to-end paid call.

## Tools

Discovered dynamically — `tools/list` is the source of truth. At launch:

| Tool | Price | What it does |
|---|---|---|
| `cc0pedia` | $0.01 | Resolve one CC0 creator/collection/work by name or slug → provenance, license, on-chain pointers, full CC0 body |
| `cc0pedia-search` | $0.01 | Ranked free-text search across the CC0 database |
| `cc0pedia-verify` | $0.01 | License oracle — is a contract a documented CC0 work? + full provenance |
| `cc0pedia-market` | $0.01 | Live market for a CC0 asset — token price/FDV/liquidity/volume, or NFT floor/volume/owners |
| `cc0-daily-brief` | $0.05 | Hourly digest of the top CC0 NFT collections by 24h volume |
| `sartoshi-gen` · `darkfarms-gen` · `hokusai-gen` · `van-gogh-gen` · `monet-gen` | $0.069 | CC0 image generation (async — returns a `job_id` to poll) |
| `mfergpt-ask` · `mfergpt-lore` · `mfergpt-mferfy` | varies | Third-party mfergpt services, re-brokered over x402 |

## Quick check (free)

```bash
curl -s https://cc0.company/api/mcp \
  -X POST -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' \
  | jq '.result.tools[].name'
```

## Data license

cc0pedia content is dedicated to the public domain (**CC0-1.0**) — reuse, repost, remix without attribution. This repository is CC0 too.

## Links

- Site — https://cc0.company
- Encyclopedia — https://cc0.company/cc0pedia
- Agent docs — https://cc0.company/agents?tab=docs
