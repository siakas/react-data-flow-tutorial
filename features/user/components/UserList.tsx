import { cn } from "@/lib/utils";

import { UserCard } from "@/features/user/components/UserCard";
import { useUserStore } from "@/features/user/stores/UserStore";

type Props = {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
};

export const UserList = ({ viewMode, onViewModeChange }: Props) => {
  const filteredUsers = useUserStore((state) => state.getFilteredUsers());
  const openModal = useUserStore((state) => state.openModal);

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      {/* ヘッダー */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          ユーザー一覧（{filteredUsers.length}名）
        </h2>
        <div className="flex items-center gap-2">
          {/* ビューモード切替 */}
          <button
            onClick={() => onViewModeChange("grid")}
            className={cn(
              "cursor-pointer rounded p-2",
              viewMode === "grid"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700",
            )}
            title="グリッド表示"
          >
            <GridIcon />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={cn(
              "cursor-pointer rounded p-2",
              viewMode === "list"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700",
            )}
            title="リスト表示"
          >
            <ListIcon />
          </button>

          {/* 新規作成 */}
          <button
            onClick={() => openModal()}
            className="ml-4 cursor-pointer rounded-lg bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
          >
            新規作成
          </button>
        </div>
      </div>

      {/* ユーザーリスト */}
      {filteredUsers.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          該当するユーザーが見つかりません
        </div>
      ) : (
        <div
          className={cn(
            viewMode === "grid"
              ? "grid grid-cols-1 gap-4 md:grid-cols-2"
              : "space-y-2",
          )}
        >
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} viewMode={viewMode} />
          ))}
        </div>
      )}

      {/* 説明 */}
      <div className="mt-4 space-y-1 rounded bg-blue-50 p-3 text-sm">
        <p className="mb-1 font-semibold">🎯 ハイブリッドアプローチ</p>
        <p>• viewMode: 親から受け取る（ローカルUI状態）</p>
        <p>• ユーザーデータ: Zustandから取得（グローバル状態）</p>
        <p>• 新規作成: Zustandのアクションを直接呼び出し</p>
      </div>
    </div>
  );
};

// アイコンコンポーネント
const GridIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const ListIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </svg>
);
