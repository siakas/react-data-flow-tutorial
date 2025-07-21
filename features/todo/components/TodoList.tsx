import { TodoItem } from "@/features/todo/components/TodoItem";
import { Todo } from "@/features/todo/types";

type Props = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
};

export const TodoList = ({ todos, onToggle, onDelete, onEdit }: Props) => {
  if (todos.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        <p>TODO がありません</p>
        <p className="mt-2 text-sm">新しい TODO を追加してください</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="mb-4 rounded bg-gray-50 p-3 text-sm text-gray-600">
        💡
        各TodoItemは親から受け取った関数を実行することで、親にイベントを通知します
      </div>

      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );

  return <div>Enter</div>;
};
