# Steal Anime Egg Wiki — 上线交付与 SEO 验收

日期：2026-10-12，Asia/Shanghai。

**网站已实际上线到固定域名 https://stealanimeegg.wiki。** GitHub、Cloudflare Pages、HTTPS、DNSSEC、GSC 域名验证和 GA4 接收已完成。首页已确认索引；Codes 页收录请求已成功加入优先抓取队列。Sitemap 索引及子文件已提交，但 GSC Sitemaps 报告最后仍显示 `Couldn't fetch`；Google 实时检查同时确认索引文件允许抓取、获取成功。报告处理成功及 Codes 实际索引不冒充已完成。

## SEO

### 基线与增量研究

原始基线保存在 [baseline-v4.1.json](../research/baseline-v4.1.json)，没有被新研究覆盖。P0 `steal anime eggs codes` 的 **KD 10**、首位 **DR 4**、约 8 个月站龄、3 席 YouTube、约 7 个有效竞争位置及当时缺少专门攻略页面，是用户继承的数据，原始采集日期未提供。

当前观察另存于 [初始快照](../research/keywords-2026-10-12.json) 和 [最终增量快照](../research/keywords-2026-10-12-final.json)。当前 Google 结果已经出现 Buxy、UrGameTips 等攻略，以及大量其他 egg 游戏页面，因此不能继续把旧“没有专门攻略”判断当作当前结论。

| 关键词 | 搜索意图 | 当前趋势信号 | KD / 月搜索量 / 当前 DR | 实际 SERP 竞争分 | 页面与建议 |
| --- | --- | --- | --- | --- | --- |
| steal anime eggs codes | 已验证奖励、兑换方式 | 精确 Suggest 无补全；变体有 codes 信号；没有数值趋势 | KD 10 为继承值；其余未知 | 2/5 | `/codes`，保持 P0；先回答验证状态 |
| steal anime eggs | 游戏入口、介绍、起步 | Suggest 有核心词；Trends 图表服务错误 | 均未知 | 2/5 | `/`，明确开发者与 place ID |
| steal and hatch anime eggs roblox codes | 奖励搜索，游戏身份混淆较强 | 精确 Suggest 无补全；无数值趋势 | 均未知 | 2/5 | `/codes` FAQ 辅助覆盖，不另造落地页 |
| steal an anime egg | 游戏、攻略、codes 的混合意图 | Suggest 有 codes、bug、discord、Roblox；无数值趋势 | 均未知 | 2/5 | `/which-game` 和首页 FAQ，解释身份差异 |

实际 US-English Google SERP 使用 `hl=en&gl=us&pws=0` 检查；界面显示结果未个性化。按顺序保存的普通结果链接分别为 9、7、8、7 个，未暴露的席位没有补造，嵌入视频另记。完整 URL、搜索意图、DR 空值、内容缺口、页面类型及建议见 [SERP 最终记录](../research/serp-2026-10-12-final.json)。评分按精确主题相关度判断，不能理解为邻近大型站点很弱或保证排名。

主要内容缺口是**正确游戏身份、可追溯兑换码状态、明确证据边界**。变体 SERP 的首位和 AI Overview 指向 BlinkWorks 的另一款游戏，进一步支持身份区分页。AI Overview 及视频标题没有被采纳为游戏事实。

### 数据来源与限制

| 渠道 | 实际结果 |
| --- | --- |
| Google SERP / Suggest | 四个基线词均已检查、保存结果 |
| Google Trends | 核心词，美国、过去 12 个月、Web Search 已打开；图表返回服务错误，没有趋势序列 |
| Similarweb | 竞争站 `stealanimeeggs.wiki` 页面返回 403，没有流量估计 |
| YouTube | 发现相关视频及 codes 标题；未验证兑换，不将播放量当作 Google 搜索需求 |
| Roblox | 官方页面、place→universe 映射、游戏及创作者公开 API 已核对 |
| 玩家社区 | 检查公开创作者资料与社区发现；未审计私人 Discord 或受限公告 |
| Ahrefs / Semrush | 无可用认证数据，当前 KD、DR、月搜索量不伪造 |

访问失败不是零需求。证据见 [Trends](../research/trends-check.json)、[Similarweb](../research/similarweb-check.json) 和 [研究说明](../research/seo-research.md)。

### 页面矩阵

首版是 **9 个内容、导航和信任页面，8 个可索引页面**，另有真实返回 404 的错误页。没有为了凑 10–20 页发布薄内容。

| 页面 | 功能与意图 | 索引 |
| --- | --- | --- |
| [首页](https://stealanimeegg.wiki/) | 游戏介绍、入口、官方玩法循环、Updates、FAQ | 是；GSC 已确认 |
| [Codes](https://stealanimeegg.wiki/codes) | Active / Expired / 兑换验证边界 / Code History | 是；已请求收录，实际索引待确认 |
| [Beginner Guide](https://stealanimeegg.wiki/guide) | 官方说明支持的起步流程 | 是 |
| [Guides](https://stealanimeegg.wiki/guides) | 分类与导航入口 | 是 |
| [Which game?](https://stealanimeegg.wiki/which-game) | 开发者与 place ID 比较，处理同名混淆 | 是 |
| [Updates](https://stealanimeegg.wiki/updates) | 已核对元数据与未验证补丁内容的区别 | 是 |
| [Sources](https://stealanimeegg.wiki/sources) | 来源、验证方法和证据边界 | 是 |
| [About](https://stealanimeegg.wiki/about) | 非官方声明与纠错渠道 | 是 |
| [Privacy](https://stealanimeegg.wiki/privacy) | 搜索、托管、统计同意与撤回说明 | noindex,follow |

完整批准与暂缓矩阵见 [page-matrix.md](../research/page-matrix.md)。

## 网站

| 项目 | 实际交付 |
| --- | --- |
| 正式域名 | [https://stealanimeegg.wiki](https://stealanimeegg.wiki) |
| GitHub | [jjasnek-ops/steal-anime-egg-wiki](https://github.com/jjasnek-ops/steal-anime-egg-wiki) |
| Pages 地址 | [steal-anime-egg-wiki.pages.dev](https://steal-anime-egg-wiki.pages.dev) |
| 部署方式 | Cloudflare Pages Direct Upload，Production / main；52 个文件 |
| 框架 | Astro 7.3.8 + Starlight 0.42.6，静态 MDX，Pagefind 搜索 |
| 套餐 | Cloudflare Free；本次没有购买付费资源 |
| DNS | Spaceship 注册商，已切换 Cloudflare nameserver |
| HTTPS | Pages 显示 Active / SSL enabled；实际 TLS 验证及 HTTP→HTTPS 通过 |
| GSC | `stealanimeegg.wiki` 域名属性，手动 TXT 所有权验证成功 |
| GA4 | 属性 558494686；Stream 16109747416；G-2PSTQYJ16Z |

源码推送触发 GitHub 检查。**Pages 没有连接 Git 自动部署**；必要更新使用 `pnpm verify` 后上传 dist，或使用已授权、已登录的 Wrangler。维护步骤在 [README](../README.md)。

### DNSSEC 迁移与恢复

此次临时撤销旧 DNSSEC 和迁移名称服务器已获得用户明确授权。注册商最初的旧 DS 为 Key Tag 25996；迁移后登记 Cloudflare 新 DS，并核验公开 DNS 响应 `Status=0`、`AD=true`。

- Nameserver：`armfazh.ns.cloudflare.com`、`laura.ns.cloudflare.com`。
- 新 DS：`2371 13 2 415988417922E0330E549CC7C23B0FF00FFD52588488C6DE00D2D384A08BF607`。
- 新签名已保存；没有留下临时关闭状态。
- GSC 验证 TXT 保留在目标 Cloudflare 区域，后续不应移除。

### 技术与浏览器验收

| 检查 | 结果 |
| --- | --- |
| Astro 类型检查 | 0 errors / 0 warnings / 0 hints |
| 静态 SEO / 结构 / 链接 | 163 项通过 |
| 同意与撤回功能边界 | 7 项通过 |
| 正式 HTTP / TLS / SEO | 18 个请求，108 项通过 |
| 手机布局 | 9 个页面在 390×844 CSS 视口通过，整页无横向溢出 |
| 搜索 | treadmill 返回 4 个页面；点击正确进入 `/guide#5-train-speed-on-the-treadmill` |
| 重定向与错误 | HTTP、index.html、codes.html 指向规范 URL；不存在的页面返回 404 |
| SEO 产物 | 独立 Title / Description、固定域名 canonical / OG、有效 JSON-LD、robots 与 8 页 Sitemap |

手机验收发现的表格最小宽度问题已修复并重新部署；宽表格在自身内部滚动。构建仍有 Starlight 空 i18n 与 404 路由优先级提示，最终静态输出和实际 404 响应均通过，未把提示伪报为类型错误。

验证报告：[静态](technical-audit.json)、[正式 HTTP](live-http-audit.json)、[手机](responsive-audit.json)、[统计同意](consent-check.json)。最终事实措辞修正版源码的 [GitHub CI](https://github.com/jjasnek-ops/steal-anime-egg-wiki/actions/runs/38225254825) 已通过。未宣称 Lighthouse 分数或尚不存在的 Core Web Vitals 实际用户数据。

### Google 服务状态

GA4 实际实时报告收到当前首页标题的 `page_view`、`session_start`、`first_visit`。这是验收访问，不计为自然流量成绩。浏览器实测同意前 Google 脚本为 0，同意后才加载正确 Measurement ID；撤回选择并刷新后脚本仍为 0。[浏览器验收记录](browser-acceptance.json)。正式统计只在固定域名、用户同意后启动；预览域名不发送正式数据。

GSC 首页显示 **URL is on Google / Page is indexed**。最近抓取在 GSC 界面显示为 2026-10-12 15:46:11（界面时区未单独确认），Googlebot smartphone，获取 Successful，Google-selected canonical 为被检查的正式首页。[首页证据](gsc-home-indexed.json)。

Codes 页面最初显示 URL 未知；收录请求已成功加入优先抓取队列，**不等于已索引**。[请求证据](gsc-codes-request.json)。

`sitemap-index.xml` 与 `sitemap-0.xml` 均提交成功。Sitemaps 报告最后仍是 `Couldn't fetch / Unknown`、Last read 空白，不能宣称解析 Success。[最终表格记录](gsc-sitemaps-final.json)。Google 实时检查索引文件为 **Crawl allowed = Yes，Page fetch = Successful**；公开响应也为 200 XML，包含正确的 8 个页面。[实时检查证据](gsc-live-sitemap.json)。按照 [Google 官方诊断步骤](https://support.google.com/webmasters/answer/7451001?hl=en)，已核对文件、robots、公开请求和 Google 实时抓取。详情行未能通过当前控制界面打开，已有索引 URL 的再次提交按钮也未启用，未删除原提交记录。报告状态的具体原因尚未确定，后续需核对 Google 处理结果。

## 内容与事实

准确游戏身份：**Steal Anime Eggs**，place **96727061242653**，universe **10759478428**，开发者 **And Collect Insane Animes**，creator group **424082979**。[官方 Roblox 页面](https://www.roblox.com/games/96727061242653/Steal-Anime-Eggs)，[官方元数据](https://games.roblox.com/v1/games?universeIds=10759478428)。

所有页面声明：**This is an unofficial fan-made guide website.** 没有宣称 Roblox 认证、开发者授权或官方 Wiki。插图为原创编辑概念图，明确不是游戏截图或游戏物品证据。

最终人工复核移除了三处未经验证的“游戏有教程”默认假设，改为遵循实际显示的屏幕提示；没有借通用新手建议假造游戏功能。

| 事实范围 | 发布状态 |
| --- | --- |
| 游戏身份、设备支持、服务器上限 | 官方页面/API 已验证 |
| 偷蛋、孵化 anime、收入、升级、跑步机 Speed、rarity/size/mutation 概念 | 官方说明支持；没有额外数值推测 |
| 活跃兑换码 | **No active codes found.** 没有发布任何未验证字符串 |
| 过期兑换码 | 没有已验证历史码，不虚构 expired 列表 |
| 兑换入口与确切操作 | 尚未验证，不假造按钮、菜单或成功奖励 |
| 更新日志 | 官方更新时间只作为元数据，不编造成 patch notes |
| 游戏内验证 | 未完成实机测试，页面明确说明限制 |

事实逐条保存 Fact / Source URL / Source Type / Date / Version / Verification Status：[evidence-ledger.md](../research/evidence-ledger.md)。

暂缓发布：完整 eggs、pets、items、maps 目录、tier list、概率、价格、计时器、精确控件、重生数值及未经验证的补丁内容。缺少经过确认的搜索需求与精确游戏证据。没有 script、hack、exploit、cheat 或 injector 页面。

## 商业判断与必要维护

1. **是否值得继续投入？** 值得做低成本、有限投入的验证。现在有真实站点和测量基础，但没有可靠月搜索量，不支持马上扩大内容投入。
2. **最大流量入口？** 预期 `/codes`，依据继承 P0 与变体的 codes 意图；首页及新手指南支持。此判断不是现有流量或排名成绩。
3. **最大风险？** 同名游戏造成错误搜索匹配，需求规模未知，无已验证兑换码，缺少实机证据，以及 Roblox 游戏快速变化。
4. **下一步动作？** 先核对 Codes 索引与 Sitemap 处理，再在上线第 7 / 14 / 28 天查看 GSC 查询、曝光、点击和国家数据；取得精确游戏实机证据后，才扩展有需求的条目。

必要更新采用：核对官方公告或游戏内证据 → 追加证据台账与真实检查日期 → 编辑对应 MDX → `pnpm verify` → 部署 → 检查正式域名。`refresh-evidence` 只保存 API 快照，不自动生成文章或修改日期。没有创建垃圾内容生成器、自动日期刷新或定时批量发文。

剩余 Google 处理状态不需要改域名、付费或重新迁移 DNS。只有出现具体可复现错误或真实资料变化时再修改站点。
