"use client";

import { useState, useMemo } from "react";
import todosData from "@/data/todos.json";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

type Todo = {
  id: number;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  createdAt: string;
  dueDate: string;
};

const todos: Todo[] = todosData as Todo[];

const ITEMS_PER_PAGE = 10;

const statusConfig: Record<
  Todo["status"],
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  pending: { label: "待處理", variant: "outline" },
  "in-progress": { label: "進行中", variant: "default" },
  completed: { label: "已完成", variant: "secondary" },
};

const priorityConfig: Record<
  Todo["priority"],
  { label: string; className: string }
> = {
  high: { label: "高", className: "bg-red-100 text-red-700 border-red-200" },
  medium: { label: "中", className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  low: { label: "低", className: "bg-green-100 text-green-700 border-green-200" },
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTodos = useMemo(() => {
    const query = searchQuery.toLowerCase();
    if (!query) return todos;
    return todos.filter(
      (todo) =>
        todo.title.toLowerCase().includes(query) ||
        todo.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredTodos.length / ITEMS_PER_PAGE);

  const paginatedTodos = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTodos.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTodos, currentPage]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">待辦事項清單</h1>
          <p className="mt-1 text-sm text-gray-500">
            共 {todos.length} 筆資料，目前顯示 {filteredTodos.length} 筆結果
          </p>
        </div>

        <div className="mb-6 flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="搜尋標題或描述..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-9 bg-white"
            />
          </div>
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setCurrentPage(1);
              }}
            >
              清除
            </Button>
          )}
        </div>

        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-12 text-center font-semibold text-gray-700">#</TableHead>
                <TableHead className="font-semibold text-gray-700">標題</TableHead>
                <TableHead className="font-semibold text-gray-700 hidden md:table-cell">描述</TableHead>
                <TableHead className="font-semibold text-gray-700 text-center">狀態</TableHead>
                <TableHead className="font-semibold text-gray-700 text-center">優先級</TableHead>
                <TableHead className="font-semibold text-gray-700 hidden lg:table-cell">截止日期</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTodos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-gray-400">
                    沒有符合條件的待辦事項
                  </TableCell>
                </TableRow>
              ) : (
                paginatedTodos.map((todo) => (
                  <TableRow key={todo.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="text-center text-sm text-gray-400 font-mono">
                      {todo.id}
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-gray-900 text-sm">{todo.title}</span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="text-sm text-gray-500 line-clamp-1">{todo.description}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={statusConfig[todo.status].variant} className="text-xs">
                        {statusConfig[todo.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold " + priorityConfig[todo.priority].className}>
                        {priorityConfig[todo.priority].label}
                      </span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-gray-500">
                      {todo.dueDate}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              第 {currentPage} / {totalPages} 頁，共 {filteredTodos.length} 筆
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {getPageNumbers().map((page, index) =>
                page === "..." ? (
                  <span key={"ellipsis-" + index} className="px-2 text-gray-400 text-sm">…</span>
                ) : (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8 text-sm"
                    onClick={() => handlePageChange(page as number)}
                  >
                    {page}
                  </Button>
                )
              )}

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
