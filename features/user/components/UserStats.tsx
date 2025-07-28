import { useUserStore } from "@/features/user/stores/UserStore";

export const UserStats = () => {
  const users = useUserStore((state) => state.users);
  const getActiveUsersCount = useUserStore(
    (state) => state.getActiveUsersCount,
  );
  const getUsersByDepartment = useUserStore(
    (state) => state.getUsersByDepartment,
  );

  const activeCount = getActiveUsersCount();
  const inactiveCount = users.filter((u) => u.status === "inactive").length;
  const suspendedCount = users.filter((u) => u.status === "suspended").length;

  const roleStats = {
    admin: users.filter((u) => u.role === "admin").length,
    editor: users.filter((u) => u.role === "editor").length,
    viewer: users.filter((u) => u.role === "viewer").length,
  };

  const departmentStats = getUsersByDepartment();
  const topDepartments = Object.entries(departmentStats)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 3);

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* 総ユーザー数 */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-600">総ユーザー数</p>
            <p className="mt-1 text-3xl font-bold">{users.length}</p>
          </div>
          <div className="rounded-full bg-blue-100 p-3">
            <UsersIcon className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>

      {/* アクティブユーザー */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-600">アクティブ</p>
            <p className="mt-1 text-3xl font-bold text-green-600">
              {activeCount}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {users.length > 0
                ? `${Math.round((activeCount / users.length) * 100)}%`
                : "0%"}
            </p>
          </div>
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircleIcon className="h-6 w-6 text-green-600" />
          </div>
        </div>
      </div>

      {/* ロール分布 */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <p className="mb-3 text-sm text-gray-600">ロール分布</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">管理者</span>
            <span className="font-semibold">{roleStats.admin}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">編集者</span>
            <span className="font-semibold">{roleStats.editor}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">閲覧者</span>
            <span className="font-semibold">{roleStats.viewer}</span>
          </div>
        </div>
      </div>

      {/* トップ部署 */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <p className="mb-3 text-sm text-gray-600">トップ部署</p>
        <div className="space-y-2">
          {topDepartments.map(([dept, users], index) => (
            <div key={dept} className="flex items-center justify-between">
              <span className="truncate text-sm">{dept}</span>
              <span className="font-semibold">{users.length}名</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// アイコンコンポーネント
const UsersIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
