# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 语言规范

- 所有对话和文档使用中文
- 代码注释使用中文
- 页面内容使用中文

## 运行环境

- Shell：Git Bash（`bash`），不使用 PowerShell 或 cmd
- 终端路径使用正斜杠格式

## 项目概述

个人摄影作品展示网站，Vue 3 静态站点，部署到 Vercel。

## 技术栈与版本

| 包 | 版本 | 用途 |
|---|---|---|
| vue | 3.5.40 | 前端框架，`<script setup>` + Composition API |
| vite | 6.4.3 | 构建工具 |
| vue-router | 4.6.4 | History 模式路由，懒加载 |
| tailwindcss | 4.3.2 | 原子化 CSS（v4 CSS-first 配置） |
| @tailwindcss/vite | 4.3.2 | Tailwind v4 Vite 插件，无 PostCSS |
| exifr | 7.1.3 | 照片 EXIF 元数据读取 |

## 常用命令

```bash
npm install          # 安装依赖
npm run dev          # 启动开发服务器
npm run build        # 生产构建
npm run preview      # 本地预览生产构建产物
```

## 目录架构

```
src/
├── main.js                  # 应用入口：createApp → use(router) → mount
├── App.vue                  # 根组件：Navbar + <router-view> + Footer + 页面过渡动画
├── style.css                # Tailwind v4 入口 @import "tailwindcss" + @theme 主题色
├── router/index.js          # 路由配置（6 条路由，懒加载，scrollBehavior 置顶）
├── components/              # 可复用组件（按功能域分目录）
│   └── layout/              #   布局组件
├── views/                   # 页面组件（每个路由一个 .vue 文件）
├── composables/             # 组合式函数（逻辑复用，尚未创建）
├── data/                    # 静态数据（照片 JSON，尚未创建）
└── utils/                   # 工具函数（尚未创建）
```

## 架构决策

- **不引入 Pinia**：本项目为静态站点，照片数据量小，直接通过 `composables` + `props/emits` 管理状态
- **不引入 UI 组件库**：Tailwind v4 纯手写样式，保持极简
- **Tailwind v4 CSS-first 配置**：无 `tailwind.config.js`、无 `postcss.config.js`，主题色在 `src/style.css` 的 `@theme` 块中定义
- **路由懒加载**：所有页面组件通过 `() => import()` 动态导入，构建时自动拆分为独立 chunk
- **SPA fallback**：`vercel.json` 将所有路径重写到 `/index.html`，配合 Vue Router History 模式

## 路由表

| 路径 | 视图 | 说明 |
|---|---|---|
| `/` | HomePage | 首页：Hero + 精选作品 |
| `/gallery` | GalleryPage | 作品集：分类筛选 + 瀑布流 |
| `/gallery/:category` | GalleryPage | 作品集（预筛选） |
| `/photo/:id` | PhotoDetailPage | 照片详情 + EXIF |
| `/about` | AboutPage | 关于我 |
| `/:pathMatch(.*)*` | NotFoundPage | 404 |

## Tailwind v4 注意

- CSS 入口只需 `@import "tailwindcss";`，无需 `@tailwind base/components/utilities`
- 自定义主题色在 `@theme {}` 块内定义（`--color-primary`、`--color-accent` 等）
- Vite 插件方式引入，无需额外 PostCSS 配置
- 动态拼接的 class（如 `"text-" + size`）无法被 Tailwind 的 JIT 检测到，使用静态完整类名

## Superpowers 技能体系

本项目已加载 [superpowers](.claude/skills/using-superpowers/SKILL.md) 技能包（20+ 技能），位于 `.claude/skills/`。**任何操作前必须先检查是否有匹配的技能并调用。**

### 流程技能（控制工作方式，优先级最高）

| 技能 | 触发场景 |
|------|---------|
| `using-superpowers` | 每次对话开始，确立技能使用规则 |
| `brainstorming` | 创建功能、添加组件、修改行为 **之前**（进入 Plan Mode 前必须先运行） |
| `systematic-debugging` | 遇到任何 bug、测试失败、异常行为时（修复前先诊断） |
| `verification-before-completion` | 宣称"完成/已修复/测试通过"之前，必须运行验证命令确认 |
| `writing-plans` | 有多步骤需求、动手写代码之前制定计划 |
| `executing-plans` | 有书面计划需要在独立会话中执行 |
| `dispatching-parallel-agents` | 2 个以上可独立并行的任务 |
| `finishing-a-development-branch` | 实现完成、测试通过后决定如何合并 |

### 代码质量技能

| 技能 | 触发场景 |
|------|---------|
| `requesting-code-review` | 完成任务、实现功能、合并前验证工作 |
| `receiving-code-review` | 收到审查反馈后、实施建议前（尤其反馈不明确时） |
| `test-driven-development` | 实现功能或修复 bug 之前先写测试 |
| `subagent-driven-development` | 执行包含独立任务的实现计划 |

### Git 与工作区技能

| 技能 | 触发场景 |
|------|---------|
| `using-git-worktrees` | 需要隔离的功能开发、执行计划前确保隔离工作区 |

### 中文系列技能（本项目自动启用——代码注释/文档/交流均为中文）

| 技能 | 触发场景 |
|------|---------|
| `chinese-code-review` | 代码审查使用中文沟通 |
| `chinese-documentation` | 编写中文技术文档/README，遵循中文排版指北 |
| `chinese-commit-conventions` | 编写中文 commit message，Conventional Commits 中文适配 |
| `chinese-git-workflow` | 使用 Gitee/Coding/极狐 GitLab 时 |

### 核心规则（来自 using-superpowers）

1. **任何响应或操作之前先检查技能**——包括澄清性问题、探索代码库、查看文件之前
2. **流程技能优先于实现技能**——如 brainstorming → writing-plans → 具体实现
3. **中国特色技能与通用技能叠加使用**——如 requesting-code-review + chinese-code-review 同时使用
4. **用户指令 > 技能 > 默认行为**——只有用户明确说跳过时才能跳过技能工作流
