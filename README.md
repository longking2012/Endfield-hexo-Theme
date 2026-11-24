<div align="center">

# Endfield Theme for Hexo

**一个受《明日方舟:终末地》启发的 Hexo 博客主题**

黄黑配色 · 等高线地形背景 · 响应式 · 深色模式

[![Hexo](https://img.shields.io/badge/Hexo-5%2B-blue)](https://hexo.io/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Version](https://img.shields.io/badge/Version-0.1.0-orange)]()

[在线示例](https://xn--i9q515a7uj4zw.work/) · [安装](#安装) · [配置](#配置) · [许可证](#许可证)

</div>

---

## 简介

这是一个为 Hexo 打造的博客主题,设计灵感来自《明日方舟:终末地》的视觉语言。它采用信号黄与黑色为主的配色方案,搭配军事地形图般的等高线背景,营造出一种沉稳而富有科技感的阅读氛围。

主题专注于内容呈现,同时保留了个性化的视觉表达。无论是写作、归档还是浏览,都能获得一致且舒适的体验。

## 特性

- **终末地视觉风格** —— 信号黄(`#fffa00`)与黑色搭配,等宽字体标题,军事 HUD 风格的边框与切角细节
- **全屏等高线背景** —— 基于真实地形高程数据生成的等高线,作为全屏背景随机轮换,右下角可点击地名卡查看位置
- **深色 / 浅色模式** —— 原生支持深色模式,也可手动切换,跟随系统或自由选择
- **响应式布局** —— 适配桌面、平板、手机等多种设备
- **完整内容支持** —— 文章、标签、分类、归档一应俱全
- **代码块增强** —— highlight.js 语法高亮、一键复制、长行自动换行
- **内置音乐播放器** —— 可选的音乐播放组件,支持播放列表与歌词显示

## 安装

### 环境要求

- [Node.js](https://nodejs.org/) 12 及以上版本
- [Hexo](https://hexo.io/) 5 及以上版本

### 快速开始

在你的 Hexo 站点根目录下执行以下命令,即可完成主题的下载与启用:

```bash
# 1. 克隆主题到 themes 目录
git clone https://github.com/longking2012/Endfield-hexo-Theme.git themes/endfield

# 2. 在站点配置文件 _config.yml 中启用主题
#    将 theme 字段修改为:  theme: endfield
```

接着，清理并重新生成静态文件：

```bash
hexo clean && hexo generate
```

启动本地预览，访问 `http://localhost:4000` 查看效果：

```bash
hexo server
```

## 部署

主题下载完成后，你可以选择以下任意一种方式来展示你的博客。

### 方式一：本地部署

如果你只想在自己的电脑上预览或写作，本地部署最简单。它不需要任何服务器，所有内容都在本地运行。

```bash
# 1. 在站点根目录生成静态文件
hexo clean && hexo generate

# 2. 启动本地预览服务
hexo server
```

执行后在浏览器打开 `http://localhost:4000` 即可看到博客。这种方式适合写作时的实时预览，但网页只在本地可见，关掉命令后就会失效。

如果你想把网页生成到本地的一个文件夹里（比如交给自己的服务器托管），只需执行：

```bash
hexo clean && hexo generate
```

生成的所有静态网页都会保存在站点根目录的 `public` 文件夹里，你可以直接把这个文件夹部署到任何支持静态网站的服务器上。

### 方式二：GitHub Pages 部署

GitHub Pages 可以把你的博客免费托管到网络上，任何人都能通过链接访问。它的原理是：把生成的静态网页推送到 GitHub 的一个特殊分支，GitHub 会自动帮你发布。

#### 第一步：创建仓库

在 GitHub 上新建一个名为 `用户名.github.io` 的仓库（把“用户名”换成你的 GitHub 用户名），这个仓库就是你的博客地址。

#### 第二步：安装部署插件

在 Hexo 站点根目录安装部署工具：

```bash
npm install hexo-deployer-git --save
```

#### 第三步：配置部署信息

打开站点根目录的 `_config.yml`，找到 `deploy` 部分，改成：

```yaml
deploy:
  type: 'git'
  repo: 'https://github.com/你的用户名/你的用户名.github.io.git'
  branch: 'main'
```

#### 第四步：生成并发布

执行下面两条命令，网页就会自动发布到 GitHub Pages：

```bash
hexo clean && hexo generate
hexo deploy
```

发布成功后，稍等一两分钟，访问 `https://你的用户名.github.io` 就能看到你的博客了。

> 提示：每次更新文章后，只需重新执行上面这两条命令，网页就会自动刷新。

## 配置

主题的配置文件位于 `themes/endfield/_config.yml`,你可以在这里自定义:

| 配置项 | 说明 |
|--------|------|
| `menu` | 顶部导航菜单 |
| `accent_color` | 主题强调色 |
| `dark_mode` | 深色模式设置 |
| `footer` | 页脚内容 |
| `verification` | 搜索引擎验证 |

修改配置后,记得重新执行 `hexo clean && hexo generate` 使更改生效。

## 示例网站

你可以访问下面的站点,查看主题的实际运行效果:

**[若水凡心](https://xn--i9q515a7uj4zw.work/)**

## 更新

拉取最新版本并更新主题:

```bash
cd themes/endfield
git pull
```

## 反馈与贡献

如果在使用过程中遇到问题,或有功能建议,欢迎提交 [Issue](https://github.com/longking2012/Endfield-hexo-Theme/issues)。

## 许可证

本主题的代码部分基于 [MIT License](LICENSE) 开源,你可以自由使用、修改与分发。

<div align="center">

---

**版权声明**

本主题仅为视觉与交互模板,采用 MIT 许可开源。
主题中涉及的所有《明日方舟:终末地》(Arknights: Endfield) 相关素材 —— 包括游戏美术、Logo、角色形象、音乐及台词等 —— 其知识产权均归 **[鹰角网络(Hypergryph)](https://www.hypergryph.com/)** 所有。
本项目为非商业的开源主题,与鹰角网络无任何隶属或合作关系。

</div>
