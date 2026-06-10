# todolist-AI

A Todo List mockup built with **Next.js**, **shadcn/ui**, and **Tailwind CSS**.

## 📝 命令記錄

建立 Next.js todolist mockup

安裝 shadcn/ui 讓爺可以 demo

傳到 GitHub 並安裝 gh-pages 讓爺可以 demo

tailwind 沒有部署

你的資料拉取似乎出了問題

如果我要分享我的 核心 Prompt 以及如何下命令 你會怎麼做

用中文的方式填寫 並且訪到最上面

先回覆到沒有 核心promate

將我對你下的命令 直接記錄下來 不要有任何的修改

## ✨ Features

- 📋 **100 mock todos** loaded from a local JSON file
- 🔍 **Instant search** (no debounce) — filters by title and description
- 📄 **Pagination** — 10 items per page with smart ellipsis
- 🏷️ **Status badges** — Pending / In Progress / Completed
- ⚡ **Priority labels** — High / Medium / Low with color coding
- 📱 **Responsive design** — columns hide gracefully on smaller screens

## 🧠 我的設計思路

這個項目是 AI 輔助開發的完整演示。展示了如何從需求到完成的全面思考過程：

### 階段 1：需求分析 → 框架選擇
**你的指令：** "建立 Next.js todolist mockup"

**我的思考：**
- ✅ mockup = 快速演示，不是生產級代碼
- ✅ 選擇 Next.js 
- ✅ 選擇 shadcn/ui 

**實際行動：**
```bash
# 創建 Next.js 項目並安裝依賴
npx create-next-app@latest todolist-app --typescript
cd todolist-app
npx shadcn@latest init -d
npm install lucide-react
```

### 階段 2：功能設計 → 用戶體驗
**你的指令：** "安裝 shadcn/ui 讓爺可以 demo"

**我的思考：**
- ✅ 核心功能：搜尋（待辦清單必需）、分頁（100 條數據）、狀態/優先級可視化
- ✅ 你說「demo」→ 需要響應式設計，在各裝置上展示
- ✅ 不加 debounce → 即時反饋，展示數據真的在過濾

**實際行動：**
- 構建搜尋功能（即時跨越標題 + 描述）
- 實現智能分頁（10 條/頁，第 5 頁後顯示省略號）
- 色彩標記狀態（待處理、進行中、已完成）
- 優先級視覺層級感（高/中/低）
- 響應式隱藏列（手機隱藏描述，平板隱藏截止日期）

### 階段 3：本地 → 線上部署
**你的指令：** "傳到 GitHub 並安裝 gh-pages 讓爺可以 demo"

**我的思考：**
- ✅ GitHub Pages → 必須是靜態導出，無伺服器
- ✅ 子目錄部署 → 需要 basePath="/todolist-AI"
- ✅ 公開網址 → 方便分享給爺爺

**實際行動：**
```bash
# 配置靜態導出
# next.config.ts: output: "export", basePath: "/todolist-AI"

npm install gh-pages --save-dev
# package.json 添加: "deploy": "next build && gh-pages -d out --nojekyll"

git push origin main
npm run deploy  # 發布到 gh-pages 分支
```

### 階段 4：測試發現問題 → 主動除錯
**你的反饋：** "tailwind 沒有部署"

**我的思考：**
- 🚨 CSS 沒載入 → GitHub Pages 經典問題
- 🚨 根本原因：Jekyll 自動忽略底線開頭的資料夾（_next/）
- ✅ 解決方案：--nojekyll 告訴 GitHub Pages 跳過 Jekyll 處理

**實際行動：**
```bash
# 修改 deploy 指令
# "deploy": "next build && gh-pages -d out --nojekyll"

# 驗證 CSS 現在返回 HTTP 200
curl -I https://github.com/Pk-huang/todolist-AI/.../*.css

npm run deploy  # 重新部署
```

### 階段 5：編碼問題 → 系統修復
**你的反饋：** "你的資料拉取似乎出了問題"（看到 \uXXXX 而不是中文）

**我的思考：**
- 🚨 Unicode 轉義序列在輸出中可見
- 🚨 根本原因：page.tsx 有字面的 \uXXXX 而不是 UTF-8
- ✅ 解決方案：全面替換轉義序列為原生中文字符
- ✅ 元數據也是英文預設 → 更新標題/描述/語言

**實際行動：**
```bash
# 識別 20+ 個轉義序列實例
# \u5f85\u8655\u7406 → 待處理
# \u9032\u884c\u4e2d → 進行中
# \u5df2\u5b8c\u6210 → 已完成

# 套用全面補丁修復所有中文文本
git add src/app/page.tsx src/app/layout.tsx
git commit -m "fix: restore chinese ui text and metadata"
git push origin main
npm run deploy
```

### 階段 6：分享知識 → 透明化過程
**你的問題：** "如果要分享核心 Prompt 和如何下命令，怎麼做？"

**我的思考：**
- ✅ 透明度：分享 AI 被提示的方式
- ✅ 可重現性：包含所有運行/部署命令
- ✅ 學習價值：記錄每個決策的原因
- ✅ 背景脈絡：幫助別人理解為什麼這樣選擇

**實際行動：**
- 添加「System Prompt」章節展示 AI 指導原則
- 添加「Usage Instructions」逐步指南
- 添加「Command Examples」複製即用的命令
- 創建本章節記錄設計思路

### 核心原則對應表

| 原則 | 如何應用 |
|-----|---------|
| **先理解再行動** | 釐清 mockup vs 生產級需求 |
| **主動問題解決** | 不等你說 CSS 有問題，主動測試部署 |
| **數據驅動除錯** | 用 HTTP 檢查、grep 搜尋識別編碼問題 |
| **透明進度追蹤** | 所有工作在 git 歷史中，每次提交都有意義 |
| **減少用戶努力** | 預先建 100 條 mock 數據，寫好部署腳本 |
| **迭代驗證** | 本地開發 → GitHub Pages → 你驗證，每階段都確認 |

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

##  使用說明

### 本地開發

1. **克隆倉庫：**
   ```bash
   git clone https://github.com/Pk-huang/todolist-AI.git
   cd todolist-app
   ```

2. **安裝依賴：**
   ```bash
   npm install
   ```

3. **啟動開發伺服器：**
   ```bash
   npm run dev
   ```

4. **在瀏覽器打開：**
   - 本地：`http://localhost:3000/todolist-AI`
   - 已預設 100 條 mock 待辦事項，可搜尋和分頁

### 功能使用

- **搜尋**：在搜尋框輸入，即時過濾標題或描述（無 debounce）
- **分頁**：使用上一頁/下一頁按鈕導航；點擊數字按鈕跳轉特定頁數
- **狀態徽章**：色彩編碼狀態指示符（待處理、進行中、已完成）
- **優先級**：視覺優先級編碼（高/紅、中/黃、低/綠）
- **響應式列**：表格根據螢幕尺寸調整（手機隱藏描述，平板隱藏截止日期）

## 🔧 指令範例

### 開發

```bash
# 在 http://localhost:3000/todolist-AI 啟動開發伺服器
npm run dev

# 構建靜態導出（生成 /out 目錄）
npm run build

# 檢查 TypeScript 錯誤
npm run lint
```

### 部署

```bash
# 完整部署到 GitHub Pages
npm run deploy
# 執行命令：next build && gh-pages -d out --nojekyll

# 手動步驟（如需要）：
npm run build        # 創建優化的构建
gh-pages -d out --nojekyll  # 發佈並禁用 Jekyll
```

### Git 工作流

```bash
# 修改後：
git add .
git commit -m "your commit message"
git push origin main

# 部署新變更：
npm run deploy
```

## 🎯 配置

### 重要文件

- **next.config.ts**：設置 `basePath: "/todolist-AI"` 用於 GitHub Pages 子目錄
- **src/data/todos.json**：添加或修改 100 條 mock 待辦事項
- **src/app/page.tsx**：主要組件，包含搜尋/分頁邏輯
- **.nojekyll**：GitHub Pages 必需，防止 Jekyll 忽略 `_next/` 資料夾

### 環境要求

- **Node.js**：18+ 推薦
- **npm**：9+
- **套件管理器**：npm（可切換為 yarn/pnpm）
