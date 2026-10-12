# 网站配图更新 — 2026-10-12

本次按用户要求，为已上线的 Steal Anime Egg Wiki 加入与内容对应的图片。固定域名仍为 https://stealanimeegg.wiki。

## 已完成的改动

| 页面 | 配图与用途 |
| --- | --- |
| 首页 `/` | 将通用概念蛋主图换成目标游戏的 Roblox 图标；游戏介绍加入一张宣传图 |
| 新手指南 `/guide` | 加入偷蛋主题宣传图，以及根据已核实描述绘制的五步矢量流程图 |
| Codes `/codes` | 在同名游戏说明后加入小型游戏识别卡，保留首屏代码状态回答 |
| 游戏识别 `/which-game` | 加入图标、创作者和 place ID 的识别卡 |
| 来源 `/sources` | 增加图片来源、用途和素材证据边界 |

只选用了 Roblox 对目标 universe **10759478428** 返回的图标及两张已完成缩略图。宣传图 asset ID 为 **137951411451750**、**88655379086265**，版本 TN3。图片经过视觉核对；原始尺寸为图标 512×512、宣传图 767×432（API 请求规格是 768×432）。来源 URL、抓取时间、SHA-256 与页面用途见 [image-provenance-2026-10-12.json](../research/image-provenance-2026-10-12.json)。证据账本新增 F08，既有关键词基线和历史事实保持原记录。

图片明确标注为 Roblox 列表宣传素材，不作为实机测试、角色名称、稀有度、奖励或兑换码的证据。流程图是本站根据 F02/F03 制作的概念示意，不伪装成游戏界面。

## 性能与无障碍

- 图片随静态站点本地部署，浏览器不需要请求 Roblox CDN。
- 首页图标使用约 31 KB 的 WebP，优先加载。
- 正文宣传图提供 384 px 与原始宽度的 AVIF / WebP / JPEG 版本；手机 AVIF 约 28–32 KB。
- 正文图片按需加载，设置明确的宽高、描述性 alt、来源说明。
- 手机端流程图改为两列，识别卡使用小图；正文配图限制最大显示宽度。

## 本地验收

源码检查为 0 errors / 0 warnings / 0 hints；7 项既有同意管理检查通过。最终构建成功，172 项技术审计通过，仍有 8 个可索引页面。

实际浏览器检查了首页、Codes、新手指南、游戏识别和来源页面。手机请求视口 390×844，实际布局宽度为 375 px（滚动条占用 15 px），页面 scrollWidth 与 clientWidth 相等。桌面视口宽度 1265 px，流程图显示五列。图片显示比例正确，手机使用小尺寸宣传图。Codes 的识别图在页面顶部暂不加载，进入其所在段落后成功加载，符合 lazy loading 行为。

本地记录：[image-local-acceptance.json](image-local-acceptance.json)。

## 部署验收

Cloudflare Pages 的 Production / main 环境确认 **66/66 文件全部上传**，并返回 **Success!**。固定域名 [stealanimeegg.wiki](https://stealanimeegg.wiki) 已显示新图，正式首页图标和宣传图均成功加载，浏览器错误/警告日志为空。

- 前端对应源码：`d7eda02eab42fb7998a3ec5da5d8dc239ffe7a87`。
- [GitHub 前端校验](https://github.com/jjasnek-ops/steal-anime-egg-wiki/actions/runs/38240225747)：success。
- 最新全站公开 HTTP 验收：18 个请求、108 项检查通过，正常 HTTPS 证书验证。
- 新图片 HTTP 验收：全部 15 个响应式资源均为 200，且 SHA-256 与本地构建文件一致，图像尺寸解析正常。
- 部署 ZIP：1559930 bytes；SHA-256 `7d5bde3be53b3689d2d0a032c3b517ba9050781d960271c1bd225e3ece5e60b3`。
- [正式首页截图](screenshots/images-home-production.jpg)。
- [图片 HTTP 验收记录](image-live-assets.json) 与 [浏览器验收记录](image-browser-acceptance.json)。

页面数量、规范域名、兑换码状态、分析同意流程与 Google 配置均未因配图更新而调整。既有 GSC 状态沿用首版验收记录，本次不宣称重新验证了收录或 Sitemap 报表。
