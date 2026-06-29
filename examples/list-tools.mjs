// Free: list every tool the cc0company MCP exposes. No payment, no wallet.
//
//   node list-tools.mjs
//
const URL = "https://cc0.company/api/mcp"

const rpc = (method, params = {}) =>
  fetch(URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  }).then((r) => r.json())

const init = await rpc("initialize", {
  protocolVersion: "2025-06-18",
  capabilities: {},
  clientInfo: { name: "cc0company-mcp-example", version: "1.0.0" },
})
console.log(`server: ${init.result.serverInfo.name} v${init.result.serverInfo.version}\n`)

const { result } = await rpc("tools/list")
for (const t of result.tools) {
  console.log(`• ${t.name}`)
  console.log(`  ${t.description}\n`)
}
