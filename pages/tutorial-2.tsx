import { useMemo, useState } from "react";

import { Layout } from "@/components/Layout";
import { DataFlowDiagram } from "@/features/todo/components/DataFlowDiagram";
import { TodoFilter } from "@/features/todo/components/TodoFilter";
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

  // フィルタリングとソート
  // フィルタリングとソートは計算コストが高いので、依存する値が変わった時だけ再計算する
  const filteredAndSortedTodos = useMemo(() => {
    console.log("親: フィルタリングとソートを実行");

    // ステップ1：フィルタリング
    let filtered = todos;
    if (filter === "active") {
      filtered = todos.filter((todo) => !todo.isCompleted);
      console.log("親: 未完了の TODO のみ表示：", filtered.length);
    } else if (filter === "completed") {
      filtered = todos.filter((todo) => todo.isCompleted);
      console.log("親: 完了した TODO のみ表示：", filtered.length);
    }

    // ステップ2：ソート
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "date":
          return b.createdAt.getTime() - a.createdAt.getTime();
        case "priority":
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case "alphabetical":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    console.log("親: ソート完了:", sortBy);
    return sorted;
  }, [todos, filter, sortBy]);

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

          {/* フィルターコンポーネント：ユーザーの選択を親に伝え、現在の選択状態を表示 */}
          <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <span className="text-2xl">🔍</span>
              フィルターと並び替え
            </h2>
            <TodoFilter
              currentFilter={filter}
              currentSort={sortBy}
              onFilterChange={(newFilter) => {
                console.log("親: フィルターを変更:", newFilter);
                setFilter(newFilter);
              }}
              onSortChange={(newSort) => {
                console.log("親: ソート順を変更:", newSort);
                setSortBy(newSort);
              }}
            />
          </div>

          {/* リストコンポーネント：フィルター済みのデータを表示し、各種操作を親に伝達 */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <span className="text-2xl">📋</span>
              TODOリスト
              <span className="text-sm font-normal text-gray-600">
                （{filteredAndSortedTodos.length}件表示中）
              </span>
            </h2>
            <TodoList
              todos={filteredAndSortedTodos}
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
