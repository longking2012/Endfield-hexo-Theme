# hexo-theme-endfield

明日方舟「终末地」风格的 Hexo 博客主题。黄黑配色、军事地形图质感、全屏等高线地形背景。

## 特性

- **终末地视觉风格**：黄（`#fffa00`）× 黑配色、等宽字体标题、军事 HUD 风格边框与切角
- **全屏等高线地形背景**：基于中国知名名山的真实 DEM 数据生成等高线 SVG，随机轮换，右下角地名卡点击跳转 Bing 地图
- **响应式 + 原生深色模式**
- **文章卡片、标签、归档、分类**完整支持
- **代码块增强**：highlight.js、一键复制

## 目录结构

```
.
├── _config.yml            # 主题配置
├── package.json
├── layout/                # EJS 模板
│   ├── layout.ejs         # 全局骨架（含等高线背景 manifest 注入）
│   ├── index.ejs / post.ejs / archive.ejs / ...
│   └── _partial/          # header / footer / post-list / post
└── source/
    ├── css/endfield.css   # 主题样式（含 .ef-bg 背景层）
    ├── css/main.css
    ├── js/ef-bg.js        # 等高线背景随机轮换 + 地名卡
    ├── js/main.js         # 深色切换、复制代码等交互
    └── images/            # contour-*.svg 等高线背景图（完工后补充）
```

## 等高线背景系统

基于中国知名名山（泰山、华山、黄山、峨眉山、庐山、长白山、张家界、桂林、玉龙雪山、五台山、武当山、武夷山、三清山、神农架、九寨沟、稻城亚丁、贡嘎山、珠穆朗玛峰、天山天池、昆仑山）的真实 DEM 数据，用 `matplotlib.contour` 生成等高线 SVG，作为全屏背景随机轮换。

> 等高线数据与生成脚本整理中，完整版稍后补充。

## 配置

主题配置文件 `_config.yml`，包含菜单、强调色、字体、页脚备案号等。

## License

MIT
