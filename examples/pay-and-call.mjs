// Paid: call one tool end-to-end over x402 (USDC on Base). This mirrors
// cc0.company's own server-side x402 client, so it speaks the exact v2 flow the
// MCP expects. You need a Base wallet funded with a little USDC.
//
//   PRIVATE_KEY=0x... node pay-and-call.mjs cc0pedia-search '{"query":"punk"}'
//   PRIVATE_KEY=0x... node pay-and-call.mjs cc0pedia-verify '{"contract":"0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb"}'
//
import { privateKeyToAccount } from "viem/accounts"
import { x402Client } from "@x402/core/client"
import { x402HTTPClient } from "@x402/core/http"
import { registerExactEvmScheme } from "@x402/evm/exact/client"

const URL = "https://cc0.company/api/mcp"
const tool = process.argv[2] || "cc0pedia-search"
const args = JSON.parse(process.argv[3] || '{"query":"punk"}')

const pk = process.env.PRIVATE_KEY
if (!pk) {
  console.error("Set PRIVATE_KEY to a Base wallet funded with a little USDC.")
  process.exit(1)
}
const account = privateKeyToAccount(pk.startsWith("0x") ? pk : `0x${pk}`)

const client = new x402Client()
registerExactEvmScheme(client, { signer: account })
const http = new x402HTTPClient(client)

const init = {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "tools/call",
    params: { name: tool, arguments: args },
  }),
}

// 1) Probe — a paid tool returns HTTP 402 with the x402 challenge in the
//    PAYMENT-REQUIRED header (and an empty JSON body, which is normal for v2).
const probe = await fetch(URL, init)
if (probe.status !== 402) {
  console.log(JSON.stringify(await probe.json(), null, 2))
  process.exit(0)
}
const probeBody = await probe.json().catch(() => ({}))
const requirements = http.getPaymentRequiredResponse(
  (name) => probe.headers.get(name),
  probeBody,
)

// 2) Sign an EIP-3009 USDC authorization and retry with the payment header.
const payload = await http.createPaymentPayload(requirements)
const header = http.encodePaymentSignatureHeader(payload)
const paid = await fetch(URL, { ...init, headers: { ...init.headers, ...header } })

console.log(`status: ${paid.status}`)
console.log(JSON.stringify(await paid.json(), null, 2))
