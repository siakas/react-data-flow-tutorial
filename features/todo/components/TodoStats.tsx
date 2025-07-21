import { Todo } from "@/features/todo/types";

type Props = {
  todos: Todo[];
};

// このコンポーネントの役割
// - 親から受け取ったデータを集計して表示
// - 自分では状態を持たない（完全に親に依存）
export const TodoStats = ({ todos }: Props) => {
  const totalCount = todos.length;
  const completedCount = todos.filter((todo) => todo.isCompleted).length;
  const activeCount = totalCount - completedCount;
  const highPriorityCount = todos.filter(
    (todo) => todo.priority === "high" && !todo.isCompleted,
  ).length;

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="text-center">
        <p className="text-2xl font-bold">{totalCount}</p>
        <p className="text-sm text-gray-600">すべて</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold">{activeCount}</p>
        <p className="text-sm text-gray-600">未完了</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold">{completedCount}</p>
        <p className="text-sm text-gray-600">完了</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold">{highPriorityCount}</p>
        <p className="text-sm text-gray-600">高優先度</p>
      </div>

      <div className="col-span-4 mt-4 text-xs text-gray-500">
        ※このコンポーネントは親から受け取ったデータを集計するだけで、自分では何も変更できません
      </div>
    </div>
  );
};
