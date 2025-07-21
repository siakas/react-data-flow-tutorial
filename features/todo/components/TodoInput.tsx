import { FormEvent, useState } from "react";

import { Todo } from "@/features/todo/types";

type Props = {
  onAddTodo: (title: string, priority: Todo["priority"]) => void;
};

export const TodoInput = ({ onAddTodo }: Props) => {
  // このコンポーネント内部の状態
  // 入力中の一時的なデータのみを管理
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Todo["priority"]>("medium");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (title.trim()) {
      console.log("TodoIinput：親に新しいTODOを送信します");

      // 親に「こんな TODO を追加して」と依頼
      // 実際の追加処理は親がおこなう
      onAddTodo(title.trim(), priority);

      // 送信後、フォームをリセット
      setTitle("");
      setPriority("medium");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-2 text-sm text-gray-600">
        💡 入力内容は一時的にこのコンポーネントで管理し、送信時に親に渡します
      </div>

      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="新しいTODOを入力..."
          className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Todo["priority"])}
          className="cursor-pointer rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="low">優先度：低</option>
          <option value="medium">優先度：中</option>
          <option value="high">優先度：高</option>
        </select>

        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
        >
          追加
        </button>
      </div>
    </form>
  );
};
