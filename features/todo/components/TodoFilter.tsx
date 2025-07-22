import { cn } from "@/lib/utils";

import { FilterType, SortType } from "@/features/todo/types";

type Props = {
  // 現在の選択状態（親から受け取る）
  currentFilter: FilterType;
  currentSort: SortType;

  // 選択が変更されたときに親に通知する関数
  onFilterChange: (filter: FilterType) => void;
  onSortChange: (sort: SortType) => void;
};

export const TodoFilter = ({
  currentFilter,
  currentSort,
  onFilterChange,
  onSortChange,
}: Props) => {
  const handleFilterChange = (filter: FilterType) => {
    console.log("TodoFilter: フィルターが変更されました:", filter);
    onFilterChange(filter);
  };

  const handleSortChange = (sort: SortType) => {
    console.log("TodoFilter: ソート順が変更されました:", sort);
    onSortChange(sort);
  };

  const FilterOptions: { value: FilterType; label: string }[] = [
    { value: "all", label: "すべて" },
    { value: "active", label: "未完了" },
    { value: "completed", label: "完了" },
  ];

  const sortOptions: { value: SortType; label: string }[] = [
    { value: "date", label: "作成日順" },
    { value: "priority", label: "優先度順" },
    { value: "alphabetical", label: "アルファベット順" },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-1 rounded bg-blue-50 p-3 text-sm">
        <p className="font-semibold">データフローの説明：</p>
        <p>1. ユーザーがフィルターを選択</p>
        <p>2. このコンポーネントが親に通知</p>
        <p>3. 親が状態を更新</p>
        <p>4. 親が新しい状態をこのコンポーネントに渡す</p>
        <p>5. 選択状態が更新される</p>
      </div>

      {/* フィルター選択 */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          表示する TODO
        </label>
        <div className="flex gap-2">
          {FilterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleFilterChange(option.value)}
              className={cn(
                "cursor-pointer rounded-lg px-4 py-2 transition-colors",
                currentFilter === option.value
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* ソート選択 */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          並び替え
        </label>
        <div className="flex gap-2">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={cn(
                "cursor-pointer rounded-lg px-4 py-2 transition-colors",
                currentSort === option.value
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* 現在の状態を表示 */}
      <div className="mt-4 space-y-1 rounded bg-gray-100 p-3 text-sm">
        <p className="font-semibold">現在の状態（親から受け取った値）：</p>
        <p>フィルター：{currentFilter}</p>
        <p>ソート：{currentSort}</p>
      </div>
    </div>
  );
};
