import { useState } from "react";
import clsx from "clsx";

import { Todo } from "@/features/todo/types";

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
};

export const TodoItem = ({ todo, onToggle, onDelete, onEdit }: Props) => {
  // 編集モードの状態は、このコンポーネント内部でのみ使用
  // （一時的な UI 状態なので、親と共有する必要がない）
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  // なぜ編集完了時に親に通知するのか？
  // → 実際のデータ更新は親がおこなう必要があるため
  const handleEdit = () => {
    if (editTitle.trim() && editTitle !== todo.title) {
      console.log("TodoItem: 編集内容を親に送信:", {
        id: todo.id,
        newTitle: editTitle,
      });
      onEdit(todo.id, editTitle.trim());
    }
    setIsEditing(false);
  };

  const handleToggle = () => {
    console.log("TodoItem: 完了状態の切り替えを親に依頼:", todo.id);
    onToggle(todo.id);
  };

  const handleDelete = () => {
    console.log("TodoItem: 削除を親に依頼:", todo.id);
    onDelete(todo.id);
  };

  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  const priorityLabels = {
    low: "低",
    medium: "中",
    high: "高",
  };

  return (
    <div className="group relative">
      <div className="flex items-center gap-3 rounded-lg border p-3 hover:bg-gray-50">
        {/* チェックボックス */}
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={handleToggle}
          className="size-5 cursor-pointer"
          title="完了状態を切り替え"
        />

        {/* TODO タイトル */}
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={(e) => e.key === "Enter" && handleEdit()}
            className="flex-1 rounded border px-2 py-1"
            autoFocus
          />
        ) : (
          <span
            className={clsx(
              "flex-1 cursor-pointer",
              todo.isCompleted ? "text-gray-500 line-through" : "",
            )}
            onClick={() => {
              console.log("TodoItem: 編集モードに入ります");
              setIsEditing(true);
            }}
            title="クリックで編集"
          >
            {todo.title}
          </span>
        )}

        {/* 優先度バッジ */}
        <span
          className={clsx(
            "rounded px-2 py-1 text-xs",
            priorityColors[todo.priority],
          )}
        >
          {priorityLabels[todo.priority]}
        </span>

        {/* 作成日時 */}
        <span className="text-xs text-gray-500">
          {todo.createdAt.toLocaleDateString("ja-JP")}
        </span>

        {/* 削除ボタン */}
        <button
          onClick={handleDelete}
          className="cursor-pointer rounded p-1 text-red-500 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gray-100 hover:text-red-700"
          title="削除"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      {/* データフローの説明（開発時のみ表示） */}
      <div className="absolute right-0 -bottom-1 left-0 px-3 text-xs text-gray-400 opacity-0 transition-opacity group-hover:opacity-100">
        ID: {todo.id} | クリックイベントはすべて親に伝達されます
      </div>
    </div>
  );
};
