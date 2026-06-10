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
  pending: { label: "\u5f85\u8655\u7406", variant: "outline" },
  "in-progress": { label: "\u9032\u884c\u4e2d", variant: "default" },
  completed: { label: "\u5df2\u5b8c\u6210", variant: "secondary" },
};

const priorityConfig: Record<
  Todo["priority"],
  { label: string; className: string }
> = {
  high: { label: "\u9ad8", className: "bg-red-100 text-red-700 border-red-200" },
  medium: { label: "\u4e2d", className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  low: { label: "\u4f4e", className: "bg-green-100 text-green-700 border-green-200" },
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
          <h1 className="text-3xl font-bold text-gray-900">\u5f85\u8fa6\u4e8b\u9805\u6e05\u55ae</h1>
          <p className="mt-1 text-sm text-gray-500">
            \u5171 {todos.length} \u7b46\u8cc7\u6599\uff0c\u76ee\u524d\u986f\u793a {filteredTodos.length} \u7b46\u7d50\u679c
          </p>
        </div>

        <div className="mb-6 flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="\u641c\u5c0b\u6a19\u984c\u6216\u63cf\u8ff0..."
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
              \u6e05\u9664
            </Button>
          )}
        </div>

        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-12 text-center font-semibold text-gray-700">#</TableHead>
                <TableHead className="font-semibold text-gray-700">\u6a19\u984c</TableHead>
                <TableHead className="font-semibold text-gray-700 hidden md:table-cell">\u63cf\u8ff0</TableHead>
                <TableHead className="font-semibold text-gray-700 text-center">\u72c0\u614b</TableHead>
                <TableHead className="font-semibold text-gray-700 text-center">\u512a\u5148\u7d1a</TableHead>
                <TableHead className="font-semibold text-gray-700 hidden lg:table-cell">\u622a\u6b62\u65e5\u671f</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTodos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-gray-400">
                    \u6c92\u6709\u7b26\u5408\u689d\u4ef6\u7684\u5f85\u8fa6\u4e8b\u9805
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
              \u7b2c {currentPage} / {totalPages} \u9801\uff0c\u5171 {filteredTodos.length} \u7b46
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
                  <span key={"ellipsis-" + index} className="px-2 text-gray-400 text-sm">\u2026</span>
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
