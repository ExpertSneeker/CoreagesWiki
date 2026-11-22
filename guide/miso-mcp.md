# Miso MCP 对接指南

::: info 开放状态
Miso MCP 已在隔离服通过联调，公网接口暂未开放。下文是开放后供 QQ 机器人维护者使用的对接方式。
:::

机器人可以替玩家查询远古之心的公开玩法、粘液科技道具和配方，以及远古档案馆已发布的建筑、团体、大事记和参观说明。玩家用自己的游戏账号在官网授权，问答从该玩家的灵感余额扣点。Miso 收到的是问题、随机会话号和本轮预算。相同授权下可以追问，匿名会话最多保留四轮，闲置 30 分钟后过期。

## 给每位玩家单独授权

1. 机器人维护者从服主处取得机器人专用密钥，保存在机器人后台。用它调用 `POST https://coreages.com/api/miso/pair/start`，请求头为 `Authorization: Bearer <机器人密钥>`。
2. 将返回的 `url` 和八位 `confirmationCode` 私发给这位玩家。`code` 和 `proof` 留在机器人后台，配对有效期为 5 分钟。
3. 玩家打开链接，用游戏账号登录官网，输入配对码并设置每日扣点上限。玩家的游戏密码只填写在官网。
4. 机器人后台用同一个机器人密钥调用 `POST /api/miso/pair/finish`，JSON 请求体包含原先的 `code` 和 `proof`。玩家还没确认时返回 HTTP 202，确认后返回 `token` 与 `expiresIn`。按 QQ 成员分别保存玩家令牌，调用时使用提问者自己的令牌。

玩家令牌有效期为 30 天。玩家可在 [Miso 授权管理](https://coreages.com/api/miso/connect) 查看余额、最近消费并撤销授权。游戏密码更改后，旧授权也会失效。

## 建立 MCP 连接

选用 **Streamable HTTP**，地址为 `https://coreages.com/api/miso/mcp`。在所有请求上带玩家的 `Authorization: Bearer <玩家令牌>`。接口无状态，通过 POST 返回 JSON。若客户端尝试通过 GET 建立事件流，有效授权下返回 HTTP 405，继续使用 POST 即可。

初始化请求如下。后续请求在头部加上协商得到的 `MCP-Protocol-Version`。

```bash
curl https://coreages.com/api/miso/mcp \
  -H "Authorization: Bearer ${MISO_PLAYER_TOKEN}" \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  --data '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-11-25","capabilities":{},"clientInfo":{"name":"qq-bot","version":"1.0.0"}}}'
```

初始化后发送 `notifications/initialized`，再用 `tools/list` 获取工具定义。`tools/call` 调用 `ask_miso` 时，请求体如下。

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "ask_miso",
    "arguments": {
      "requestId": "ask-20261122-a3b1c9",
      "question": "远古档案馆里的罗德岛是什么？"
    }
  }
}
```

答案位于 `result.content[0].text`。每次新提问生成一个新的 `requestId`，同一请求网络重试时沿用原编号。连接的 JSON-RPC `id` 用于匹配响应，`requestId` 用于问答和扣点去重。

## 直接使用 HTTP

机器人也可以请求 `POST https://coreages.com/api/miso/ask`。请求头和 MCP 一样使用玩家令牌，请求体只传 `requestId` 和 `question`。成功响应含 `answer` 和本轮实际扣点 `spent`。

| 状态 | 机器人应如何处理 |
| --- | --- |
| 401 | 令牌已失效，让玩家重新配对。 |
| 402 | 灵感余额或玩家设定的每日授权额度不足。 |
| 409 | 同编号请求已在处理、已结算或被取消。先检查机器人端记录，避免为同一次提问另起编号。MCP 通常在 `result.isError` 中返回这类错误。 |
| 429 | 调用过密，稍后再试。每个玩家每分钟最多提交 8 次。 |
