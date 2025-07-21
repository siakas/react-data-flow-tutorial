import { useState } from "react";
import { Karantina } from "next/font/google";

import { Layout } from "@/components/Layout";
import { DataFlowDiagram } from "@/features/todo/components/DataFlowDiagram";
import { TodoInput } from "@/features/todo/components/TodoInput";
import { TodoList } from "@/features/todo/components/TodoList";
import { TodoStats } from "@/features/todo/components/TodoStats";
import { FilterType, SortType, Todo } from "@/features/todo/types";

export default function Tutorial2Page() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState<SortType>("date");

  // 子から親へのデータフロー例 1：新しいデータの追加
  // TodoInput コンポーネントは、ユーザーが入力した内容を親に送る
  const handleAddTodo = (title: string, priority: Todo["priority"]) => {
    console.log("親: 新しい TODO を受け取りました", { title, priority });

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      isCompleted: false,
      priority,
      createdAt: new Date(),
    };

    // 親が状態を更新
    // この更新はすべての子コンポーネントに自動的に反映される
    setTodos((prevTodos) => {
      const updated = [newTodo, ...prevTodos];
      console.log("親: TODO を追加しました。合計:", updated.length);
      return updated;
    });
  };

  // 子から親へのデータフロー例 2：既存データの更新
  // TodoItem コンポーネントは、どう TODO を変更したいかを親に伝える
  const handleToggleTodo = (id: string) => {
    console.log("親: TODO の完了状態を切り替えます:", id);

    setTodos((prevTodos) => {
      const updated = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      );
      const targetTodo = updated.find((todo) => todo.id === id);
      console.log("親: 完了状態を更新しました:", {
        id,
        isCompleted: targetTodo?.isCompleted,
      });
      return updated;
    });
  };

  // 子から親へのデータフロー例 3：データの削除
  const handleDeleteTodo = (id: string) => {
    console.log("親: TODO を削除します:", id);

    setTodos((prevTodos) => {
      const updated = prevTodos.filter((todo) => todo.id !== id);
      console.log("親: TODO を削除しました。残り:", updated.length);
      return updated;
    });
  };

  // 子から親へのデータフロー例 4：テキストの編集
  const handleEditTodo = (id: string, newTitle: string) => {
    console.log("親: TODO のタイトルを更新します:", { id, newTitle });

    setTodos((prevTodos) => {
      const updated = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo,
      );
      console.log("親: TODO を編集しました");
      return updated;
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <h1 className="mb-8 text-center text-3xl font-bold">
            親子間データフロー：発展編
          </h1>

          {/* データフローの可視化 */}
          <DataFlowDiagram
            todosCount={todos.length}
            activeFilter={filter}
            activeSort={sortBy}
          />

          {/* 入力コンポーネント：親にデータを送る */}
          <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <span className="text-2xl">📝</span>
              新しいTODOを追加
            </h2>
            <TodoInput onAddTodo={handleAddTodo} />
          </div>

          {/* 統計コンポーネント：親からデータを受け取って表示 */}
          <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <span className="text-2xl">📊</span>
              統計情報
            </h2>
            <TodoStats todos={todos} />
          </div>

          {/* リストコンポーネント：フィルター済みのデータを表示し、各種操作を親に伝達 */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <span className="text-2xl">📋</span>
              TODOリスト
              <span className="text-sm font-normal text-gray-600">
                （○○件表示中）
              </span>
            </h2>
            <TodoList
              todos={todos}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
