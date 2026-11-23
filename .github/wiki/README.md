# Wiki PR 验收与审核
- 每个发往 main 的 PR 都有 Linux 构建、6 项本地检查测试和改动页面的正文链接／图片检查。站外链接与锚点不联网检查，不读取发布密钥。路径冲突按大小写折叠检查。GitHub 仍可能要求批准首次 fork 的 Actions 运行。
- 受信任的默认分支工作流在 CI 通过后调用审稿模型。只审当前仓库、维护者本人提交、以最新 main 为基础的非草稿 Markdown PR；配置、依赖、脚本、二进制、删除／重命名、带活动语法、涉及商店和权限的投稿以及 fork 均须人工处理。机器人不会代替 GitHub 的分支规则，也不会向 PR 提交 APPROVED review；有效凭据是受信任工作流记录的明确 verdict 以及对应的提交。不要把没有审查记录视为通过。
- API 只发送有限的公开 Markdown diff，不传 repo token、历史秘密或 CI 工件，不执行 PR 的代码；审稿工作没有合并权限。审核理由只在 Actions 摘要可见。自动合并任务不会读取模型密钥。
- 自动合并使用 GitHub 的 squash API 并传入已审核的 head SHA。同一个运行只审一个快照；main 或 PR 改动后须更新分支并重跑 CI。GitHub Actions 使用内置 token 合并不会触发部署所依赖的 push，所以随后显式 dispatch 原发布流程的 main；部署没有进入合并任务。如果 dispatch 失败，在 Actions 手动运行「发布 Wiki」的 main，确认公网验收。

## 安全启用顺序
1. 人工审查并合并本设置 PR；默认不会自动合并后续 PR。
2. 在 Settings → Environments 创建 `wiki-review` 和 `wiki-auto-merge`，两者的 Deployment branches and tags 都只允许分支 `main`。随后在 **wiki-review 环境**保存专用 OpenAI 项目的 `WIKI_REVIEW_OPENAI_API_KEY`，用项目预算和速率限制约束成本。不要把凭据发到聊天或提交到 Git。模型默认 `gpt-5-mini`，可通过 Actions 变量 `WIKI_REVIEW_MODEL` 调整。确认设置前保持自动合并关闭。
3. 开一条普通文档测试 PR，检查当前提交的 CI 和审核摘要；再试一条配置变更（应不自动放行）。确认精确 commit 对应和 fork／新提交行为，必要时在审核 workflow 里重跑。
4. 给 `main` 配分支规则：要求 PR、必需 `wiki-ci` 且跟上最新 `main`；禁 force push，不配置 bot bypass。规则修改、工作流、依赖、站点配置和 fork 投稿均仍走人工合并。不要给登记了 stale verdict 的 PR 手工启用原生 Auto-merge。
5. 实际跑通只读审核并确认设置后，把 repo Actions 变量 `WIKI_AUTO_MERGE` 设为 `true`，再验证测试 PR 正好合并一次并产生现有发布运行。把变量删除或设回 `false` 可以关停后续任务；已开始的 merge job 需在 Actions 额外取消。自动化只对维护者自己同仓提交开放，拓宽范围前须另行确认。
