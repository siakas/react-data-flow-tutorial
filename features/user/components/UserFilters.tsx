import { useState } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useUserStore } from "@/features/user/stores/UserStore";
import { UserRole, UserStatus } from "@/features/user/types";

export const UserFilters = () => {
  // グローバルの状態を取得
  const filters = useUserStore((state) => state.filters);
  const setFilters = useUserStore((state) => state.setFilters);
  const resetFilters = useUserStore((state) => state.resetFilters);
  const users = useUserStore((state) => state.users);

  // ローカルの状態を定義
  const [skillInput, setSkillInput] = useState("");

  // 部署のユニークリストを取得
  const departments = Array.from(new Set(users.map((user) => user.department)));

  // 全スキルのユニークリストを取得
  const allSkills = Array.from(new Set(users.flatMap((user) => user.skills)));

  const handleSkillAdd = () => {
    if (
      skillInput.trim() &&
      !filters.skillsFilter.includes(skillInput.trim())
    ) {
      setFilters({
        skillsFilter: [...filters.skillsFilter, skillInput.trim()],
      });
      setSkillInput("");
    }
  };

  const handleSkillRemove = (skill: string) => {
    setFilters({
      skillsFilter: filters.skillsFilter.filter((s) => s !== skill),
    });
  };

  return (
    <div className="space-y-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">フィルター</h3>
        <Button onClick={resetFilters} variant="outline">
          リセット
        </Button>
      </div>

      {/* 検索 */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          検索
        </label>
        <input
          type="text"
          value={filters.searchQuery}
          onChange={(e) => setFilters({ searchQuery: e.target.value })}
          placeholder="名前またはメールで検索..."
          className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* ロールフィルター */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          ロール
        </label>
        <select
          value={filters.roleFilter}
          onChange={(e) =>
            setFilters({ roleFilter: e.target.value as UserRole | "all" })
          }
          className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">すべて</option>
          <option value="admin">管理者</option>
          <option value="editor">編集者</option>
          <option value="viewer">閲覧者</option>
        </select>
      </div>

      {/* ステータスフィルター */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          ステータス
        </label>
        <select
          value={filters.statusFilter}
          onChange={(e) =>
            setFilters({ statusFilter: e.target.value as UserStatus | "all" })
          }
          className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">すべて</option>
          <option value="active">アクティブ</option>
          <option value="inactive">非アクティブ</option>
          <option value="suspended">停止中</option>
        </select>
      </div>

      {/* 部署フィルター */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          部署
        </label>
        <select
          value={filters.departmentFilter}
          onChange={(e) => setFilters({ departmentFilter: e.target.value })}
          className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">すべて</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* スキルフィルター */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          スキル
        </label>
        <div className="mb-2 flex items-center gap-2">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSkillAdd()}
            placeholder="スキルを入力..."
            className="flex-1 rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
          <Button onClick={handleSkillAdd}>追加</Button>
        </div>

        {/* 選択されたスキル */}
        <div className="flex flex-wrap gap-2">
          {filters.skillsFilter.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
            >
              {skill}
              <button
                onClick={() => handleSkillRemove(skill)}
                className="ml-2 cursor-pointer text-blue-600 hover:text-blue-800"
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>

        {/* 候補スキル */}
        {allSkills.length > 0 && (
          <div className="mt-2">
            <p className="mb-1 text-xs text-gray-600">候補:</p>
            <div className="flex flex-wrap gap-1">
              {allSkills
                .filter((skill) => !filters.skillsFilter.includes(skill))
                .map((skill) => (
                  <button
                    key={skill}
                    onClick={() =>
                      setFilters({
                        skillsFilter: [...filters.skillsFilter, skill],
                      })
                    }
                    className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 hover:bg-gray-200"
                  >
                    {skill}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* データフローの説明 */}
      <div className="mt-4 rounded bg-yellow-50 p-3 text-sm">
        <p className="mb-1 font-semibold">🔍 Zustandでのフィルター管理</p>
        <p>
          フィルター状態はグローバルストアで管理され、どのコンポーネントからでもアクセス・更新可能です。
        </p>
      </div>
    </div>
  );
};
