import { useState } from "react";
import { Karantina } from "next/font/google";

import { Layout } from "@/components/Layout";
import { TodoInput } from "@/features/todo/components/TodoInput";
import { FilterType, SortType, Todo } from "@/features/todo/types";

export default function Tutorial2Page() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState<SortType>("date");

  // 子から親へのデータフロー例 1：新しいデータの追加
  // TodoInput コンポーネントは、ユーザーが入力した内容を親に送る
  const handleAddTodo = (title: string, priority: Todo["priority"]) => {
    console.log("親：新しい TODO を受け取りました", { title, priority });

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      isCompleted: false,
      priority,
      createdAt: new Date(),
    };

    // 親が状態を更新
    // この更新はすべての子コンポーネントに自動的に反映される
    setTodos([newTodo, ...todos]);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <h1 className="mb-8 text-center text-3xl font-bold">
            親子間データフロー：発展編
          </h1>

          {/* 入力コンポーネント：親にデータを送る */}
          <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-lg font-semibold">新しい TODO を追加</h2>
            <TodoInput onAddTodo={handleAddTodo} />
          </div>

          {/* 仮：Todo リスト */}
          {todos.length ? (
            <>
              {todos.map((todo) => (
                <div key={todo.id}>
                  {todo.title} [{todo.priority}]
                </div>
              ))}
            </>
          ) : (
            <div className="text-center">Todo はありません</div>
          )}
        </div>
      </div>
    </Layout>
  );
}
