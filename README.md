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
# todolist-AI
