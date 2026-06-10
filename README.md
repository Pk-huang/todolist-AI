# todolist-AI

A Todo List mockup built with **Next.js**, **shadcn/ui**, and **Tailwind CSS**.

## ✨ Features

- 📋 **100 mock todos** loaded from a local JSON file
- 🔍 **Instant search** (no debounce) — filters by title and description
- 📄 **Pagination** — 10 items per page with smart ellipsis
- 🏷️ **Status badges** — Pending / In Progress / Completed
- ⚡ **Priority labels** — High / Medium / Low with color coding
- 📱 **Responsive design** — columns hide gracefully on smaller screens

## 🛠️ Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router, Static Export)
- [shadcn/ui](https://ui.shadcn.com/) (Table, Input, Badge, Button)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (icons)
- TypeScript

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build & Deploy

```bash
# Build for production (static export)
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 🌐 Live Demo

[https://Pk-huang.github.io/todolist-AI/](https://Pk-huang.github.io/todolist-AI/)

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx        # Main Todo List page
│   └── globals.css
├── components/
│   └── ui/             # shadcn components
└── data/
    └── todos.json      # 100 mock todo items
```

## 💡 System Prompt

This project was created with an AI-first development approach. The core system prompt focuses on:

```
你是一个高级编程助手，具备多编程语言和框架的专业知识。
你的职责是：
1. 仔细理解用户需求
2. 主动使用工具收集必要的上下文信息
3. 执行变更而不仅仅是建议
4. 跟踪多步骤任务的进度
5. 确保完成的工作符合最小惊讶原则
6. 在代码中使用中文注释和文档字符串
7. 提供事实性的进度更新而不是冗长的解释
```

## 🧠 My Design Thinking Process

This section documents how I approached building this project from concept to completion:

### Phase 1: Requirements → Foundation
**User Request:** "建立 Next.js todolist mockup"

**My Thinking:**
- ✅ User wants a mockup: means quick demo, not production-grade
- ✅ Next.js mentioned: implies App Router, static export potential
- ✅ No UI library specified: choose shadcn/ui for speed + quality

**Actions:**
- Scaffolded Next.js 16 with TypeScript
- Installed shadcn/ui (Table, Input, Badge, Button)
- Created 100 mock todos in JSON for realistic dataset

### Phase 2: Features → Implementation
**User Request:** "安裝 shadcn/ui 讓爺可以 demo"

**My Thinking:**
- ✅ Core features needed: search (essential for todo list), pagination (UX for 100 items), status/priority visualization
- ✅ User mentioned "demo" → need responsive design visible across devices
- ✅ No debounce on search: instant feedback shows data actually filters

**Actions:**
- Built search filter (real-time across title + description)
- Implemented smart pagination (10 items/page with ellipsis at page 5+)
- Color-coded status badges (待處理, 進行中, 已完成)
- Priority levels with visual hierarchy (高/中/低)
- Responsive columns (hide description on mobile, due date on tablets)

### Phase 3: Demo → Deployment
**User Request:** "傳到 GitHub 並安裝 gh-pages 讓爺可以 demo"

**My Thinking:**
- ✅ GitHub Pages required: means static export, no server
- ✅ Subdirectory deployment: need basePath="/todolist-AI"
- ✅ Public URL needed: configure for easy sharing

**Actions:**
- Enabled static export in next.config.ts
- Set basePath="/todolist-AI"
- Installed gh-pages package
- Created deploy script: `npm run deploy`
- Pushed to https://github.com/Pk-huang/todolist-AI

### Phase 4: Issues → Active Debugging
**User Report:** "tailwind 沒有部署"

**My Thinking:**
- 🚨 CSS not loading: classic GitHub Pages issue
- 🚨 Root cause analysis: Jekyll ignores folders starting with underscore (_next/ folder)
- ✅ Solution: --nojekyll flag tells GitHub Pages to skip Jekyll processing

**Actions:**
- Added --nojekyll flag to deployment script
- Verified CSS bundle now returns HTTP 200
- Tested live demo: https://Pk-huang.github.io/todolist-AI/

### Phase 5: Data Corruption → Systematic Fix
**User Report:** "你的資料拉取似乎出了問題" (saw \uXXXX instead of Chinese)

**My Thinking:**
- 🚨 Unicode escape sequences visible in rendered output
- 🚨 Root cause: page.tsx had literal \uXXXX sequences instead of UTF-8
- ✅ Solution: Replace all escape sequences with native Chinese characters
- ✅ Metadata also in English defaults: update title/description/lang

**Actions:**
- Identified 20+ escape sequence instances
- Applied comprehensive patch to restore Chinese text
- Updated metadata: title→"todolist-AI", description→Chinese, lang→"zh-Hant"
- Rebuilt and redeployed
- Verified fix in both local dev and live demo

### Phase 6: Documentation → Sharing
**User Request:** "如果我要分享我的核心 Prompt 以及如何下命令，你會怎麼做"

**My Thinking:**
- ✅ Transparency: share how AI was prompted to build this
- ✅ Reproducibility: include all commands needed to run/deploy
- ✅ Learning: document the thinking process for each decision
- ✅ Context: help others understand why choices were made

**Actions:**
- Added "System Prompt" section showing AI guidelines
- Added "Usage Instructions" with step-by-step guide
- Added "Command Examples" with copy-paste ready commands
- Created this section to document design thinking

### Key Principles Applied

| Principle | How I Used It |
|-----------|---------------|
| **Understand Before Acting** | Asked for clarification on mockup vs production needs |
| **Proactive Problem Solving** | Didn't wait for CSS bug report—tested deployment immediately |
| **Data-Driven Debugging** | Used HTTP checks, grep searches to identify unicode issues |
| **Transparent Progress** | Cached all work in git history; each change has meaningful commit message |
| **Minimize User Effort** | Pre-created 100 mock todos, wrote deploy script, tested on GitHub Pages |
| **Iterative Validation** | Local dev → GitHub Pages → user verification at each phase |

## 📖 Usage Instructions

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Pk-huang/todolist-AI.git
   cd todolist-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - Local: `http://localhost:3000/todolist-AI`
   - The page loads with 100 mock todos ready to search and paginate

### Features Usage

- **Search**: Type in the search box to filter todos by title or description (instant, no debounce)
- **Pagination**: Navigate through pages with Previous/Next buttons; jump to specific pages using numbered buttons
- **Status Badges**: Color-coded status indicators (待處理, 進行中, 已完成)
- **Priority Levels**: Visual priority coding (高/red, 中/yellow, 低/green)
- **Responsive Columns**: Table adapts to screen size (description hidden on mobile, due date hidden on tablets)

## 🔧 Command Examples

### Development

```bash
# Start dev server on http://localhost:3000/todolist-AI
npm run dev

# Build the static export (generates /out directory)
npm run build

# Check for TypeScript errors
npm run lint
```

### Deployment

```bash
# Full deployment to GitHub Pages
npm run deploy
# This runs: next build && gh-pages -d out --nojekyll

# Manual steps (if needed):
npm run build        # Create optimized build
gh-pages -d out --nojekyll  # Publish with .nojekyll to disable Jekyll
```

### Git Workflow

```bash
# After making changes:
git add .
git commit -m "your commit message"
git push origin main

# Deploy new changes:
npm run deploy
```

## 🎯 Configuration

### Important Files

- **next.config.ts**: Sets `basePath: "/todolist-AI"` for GitHub Pages subdirectory
- **src/data/todos.json**: Add or modify 100 mock todos here
- **src/app/page.tsx**: Main component with search/pagination logic
- **.nojekyll**: Required by gh-pages to prevent Jekyll from ignoring `_next/` folder

### Environment

- **Node.js**: 18+ recommended
- **npm**: 9+
- **Package manager**: npm (can switch to yarn/pnpm if needed)
