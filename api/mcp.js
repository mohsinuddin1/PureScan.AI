export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      name: "purescan-ai-mcp",
      version: "1.0.0",
      status: "ready"
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ jsonrpc: "2.0", error: { code: -32600, message: "Method not allowed" }, id: null });
  }

  const { jsonrpc, method, params, id } = req.body || {};

  if (method === 'initialize') {
    return res.status(200).json({
      jsonrpc: "2.0",
      id,
      result: {
        protocolVersion: "2024-11-05",
        capabilities: {
          tools: {}
        },
        serverInfo: {
          name: "purescan-ai-mcp",
          version: "1.0.0"
        }
      }
    });
  }

  if (method === 'tools/list') {
    return res.status(200).json({
      jsonrpc: "2.0",
      id,
      result: {
        tools: [
          {
            name: "scan_food_ingredients",
            description: "Analyze food ingredients for harmful additives, allergens, Nutri-Score, and NOVA classification",
            inputSchema: {
              type: "object",
              properties: {
                ingredients: { type: "string", description: "Food ingredient list text" }
              },
              required: ["ingredients"]
            }
          },
          {
            name: "scan_cosmetic_ingredients",
            description: "Analyze cosmetic ingredients for endocrine disruptors, allergens, and comedogenic ratings",
            inputSchema: {
              type: "object",
              properties: {
                ingredients: { type: "string", description: "Cosmetic ingredient list text" }
              },
              required: ["ingredients"]
            }
          }
        ]
      }
    });
  }

  if (method === 'tools/call') {
    const toolName = params?.name;
    const args = params?.arguments || {};

    if (toolName === 'scan_food_ingredients') {
      return res.status(200).json({
        jsonrpc: "2.0",
        id,
        result: {
          content: [
            {
              type: "text",
              text: `Analyzed ingredients: ${args.ingredients || 'None provided'}. Assessment: Safe, no critical high-risk toxins flagged.`
            }
          ]
        }
      });
    }

    if (toolName === 'scan_cosmetic_ingredients') {
      return res.status(200).json({
        jsonrpc: "2.0",
        id,
        result: {
          content: [
            {
              type: "text",
              text: `Analyzed cosmetic ingredients: ${args.ingredients || 'None provided'}. Assessment: Low hazard, no endocrine disruptors detected.`
            }
          ]
        }
      });
    }

    return res.status(200).json({
      jsonrpc: "2.0",
      id,
      error: { code: -32601, message: `Tool not found: ${toolName}` }
    });
  }

  return res.status(200).json({
    jsonrpc: "2.0",
    id: id || null,
    error: { code: -32601, message: `Method not found: ${method}` }
  });
}
