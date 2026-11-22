# Miso MCP 对接指南

::: info 开放状态
Miso MCP 已开放。玩家登录官网后可以自行创建密钥。支持 Streamable HTTP 和 Bearer 请求头的客户端均可接入，包括聊天应用、QQ 机器人和自建工具。
:::

你可以查询远古之心的公开玩法、粘液科技道具和配方，以及远古档案馆已发布的建筑、团体、大事记和参观说明。问答从创建密钥的玩家账户扣灵感。Miso 收到的是问题、随机会话号和本轮预算。使用同一把密钥可继续追问，匿名会话最多保留四轮，闲置 30 分钟后过期。

## 创建自己的密钥

1. 用游戏账号登录官网，点击导航栏头像，再选择 [密钥管理](https://coreages.com/miso-keys/)。
2. 填写密钥名称。每日灵感扣点上限可留空，表示这把密钥每日不限，使用时仍按实际消耗扣灵感。有效期可选 **7 天、30 天、90 天或永久**，默认 30 天。
3. 点击「创建密钥」，复制并保存密钥。完整密钥只在创建时显示一次，建议给不同客户端分别创建密钥。
4. 在客户端配置 MCP 地址和请求头，填入你自己创建的密钥。替多位玩家调用的客户端应为每位玩家保存独立密钥。

在头像菜单可以查看今日剩余和长期灵感。在密钥管理可查看每把密钥今日及累计的成功调用次数和扣点，今日统计按北京时间零点切换。

- **编辑**可修改名称和每日扣点上限，保存后对后续请求生效。
- **重置**会换发新密钥，旧密钥立即失效。名称、上限、有效期和统计都会保留。新密钥只在重置时显示一次，请复制后更新客户端。
- **撤销**会停用该密钥。密钥过期或玩家更改游戏密码也会使密钥失效。此前通过配对取得的玩家密钥同样可在这里管理。

## 建立 MCP 连接

选用 **Streamable HTTP**，地址为 `https://coreages.com/api/miso/mcp`。在所有请求上带玩家的 `Authorization: Bearer <玩家令牌>`。接口无状态，通过 POST 返回 JSON。若客户端尝试通过 GET 建立事件流，有效授权下返回 HTTP 405，继续使用 POST 即可。

初始化请求如下。后续请求在头部加上协商得到的 `MCP-Protocol-Version`。

```bash
curl https://coreages.com/api/miso/mcp \
  -H "Authorization: Bearer ${MISO_PLAYER_TOKEN}" \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  --data '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-11-25","capabilities":{},"clientInfo":{"name":"miso-client","version":"1.0.0"}}}'
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

客户端也可以请求 `POST https://coreages.com/api/miso/ask`。请求头和 MCP 一样使用玩家令牌，请求体只传 `requestId` 和 `question`。成功响应含 `answer` 和本轮实际扣点 `spent`。

| 状态 | 客户端应如何处理 |
| --- | --- |
| 401 | 密钥无效或已失效，请在官网创建新密钥并更新客户端配置。 |
| 402 | 灵感余额或玩家设定的每日授权额度不足。 |
| 409 | 同编号请求已在处理、已结算或被取消。先检查客户端记录，避免为同一次提问另起编号。MCP 通常在 `result.isError` 中返回这类错误。 |
| 429 | 调用过密，稍后再试。每个玩家每分钟最多提交 8 次。 |
