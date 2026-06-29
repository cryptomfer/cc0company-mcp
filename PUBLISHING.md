# Publishing & directory listings

Canonical identity for this MCP server — keep these in sync everywhere.

| Field | Value |
|---|---|
| Server name | `io.github.cryptomfer/cc0company-mcp` |
| Endpoint | `https://cc0.company/api/mcp` (Streamable HTTP) |
| Repo | https://github.com/cryptomfer/cc0company-mcp |
| Manifest | [`server.json`](./server.json) |
| Version | bump in `server.json` on every change |
| License | CC0-1.0 |

## Official MCP Registry (registry.modelcontextprotocol.io)

`server.json` is already registry-valid (namespace `io.github.cryptomfer/*`, a
`remotes` entry, all required fields). Publish with the official CLI **from this
directory**, authenticated as the GitHub account `cryptomfer` — that's what
authorizes the `io.github.cryptomfer/*` namespace.

```bash
# install mcp-publisher (see the registry README for your OS):
#   https://github.com/modelcontextprotocol/registry
mcp-publisher login github      # GitHub device-flow auth as cryptomfer
mcp-publisher publish           # reads ./server.json
```

To update later: bump `version` in `server.json`, re-run `mcp-publisher publish`.

Most other directories crawl this registry, so publishing here is the
highest-leverage step — many listings then appear automatically.

## Smithery (smithery.ai)
Remote server. Add it at https://smithery.ai/new — connect GitHub and point at
this repo, or submit the endpoint URL. May also auto-appear once it's on the
official registry.

## mcp.so
Submit at https://mcp.so/submit with the repo URL. mcp.so also crawls GitHub.

## Glama (glama.ai/mcp) & PulseMCP (pulsemcp.com)
Crawl GitHub + the official registry automatically. Help them: keep the repo's
GitHub **topics** set (`mcp`, `model-context-protocol`, `x402`, `cc0`, `base`)
and the description filled.

## Claude connector directory (Anthropic)
Curated. Submit via Anthropic's connector/MCP submission once live; being on the
official registry with a clean `server.json` helps.

## Reusable listing copy (paste into directory forms)

- **Name:** cc0company MCP
- **Tagline:** The largest machine-readable CC0 database + cc0.company agent services, paid per call over x402.
- **Category:** Data / Web3
- **Tags:** cc0, public-domain, nft, crypto, x402, base, usdc, provenance, market-data, agents
- **Description:** A remote MCP server exposing the cc0pedia read API (look up / search / verify / price any CC0 creator, NFT collection, token or work — provenance, license, on-chain pointers, live market data) plus CC0 image generation, a daily CC0 market brief, and re-brokered third-party agents. Every tool call is a tiny x402 USDC micropayment on Base; discovery (initialize, tools/list, ping) is free.
- **Example call:** `cc0pedia-search { "query": "punk" }`
- **Docs:** https://cc0.company/agents?tab=docs · https://cc0.company/docs/mcp
