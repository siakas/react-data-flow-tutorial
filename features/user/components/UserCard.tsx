import { EditIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { useUserStore } from "@/features/user/stores/UserStore";
import { User } from "@/features/user/types";

type Props = {
  user: User;
  viewMode: "grid" | "list";
};

export const UserCard = ({ user, viewMode }: Props) => {
  const selectUser = useUserStore((state) => state.selectUser);
  const openModal = useUserStore((state) => state.openModal);
  const selectedUser = useUserStore((state) => state.selectedUser);

  const statusColors = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    suspended: "bg-red-100 text-red-800",
  };

  const roleLabels = {
    admin: "管理者",
    editor: "編集者",
    viewer: "閲覧者",
  };

  const isSelected = selectedUser?.id === user.id;

  if (viewMode === "list") {
    return (
      <div
        className={cn(
          "flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors",
          isSelected
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200 hover:bg-gray-50",
        )}
        onClick={() => selectUser(user)}
      >
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 font-semibold text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span
            className={cn(
              "rounded-full px-2 py-1 text-xs",
              statusColors[user.status],
            )}
          >
            {user.status}
          </span>
          <span className="text-sm text-gray-600">{roleLabels[user.role]}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              openModal(user.id);
            }}
            className="rounded p-1 hover:bg-gray-200"
          >
            <EditIcon />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "cursor-pointer rounded-lg border p-4 transition-all",
        isSelected
          ? "border-blue-500 bg-blue-50 shadow-md"
          : "border-gray-200 hover:shadow-md",
      )}
      onClick={() => selectUser(user)}
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300 text-lg font-semibold text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            openModal(user.id);
          }}
          className="cursor-pointer rounded p-1 transition-colors hover:bg-gray-200"
        >
          <EditIcon />
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">ロール</span>
          <span className="text-sm font-medium">{roleLabels[user.role]}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">部署</span>
          <span className="text-sm font-medium">{user.department}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">ステータス</span>
          <span
            className={cn(
              "rounded-full px-2 py-1 text-xs",
              statusColors[user.status],
            )}
          >
            {user.status}
          </span>
        </div>
      </div>

      {user.skills.length > 0 && (
        <div className="mt-3 border-t pt-3">
          <div className="flex flex-wrap gap-1">
            {user.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700"
              >
                {skill}
              </span>
            ))}
            {user.skills.length > 3 && (
              <span className="px-2 py-1 text-xs text-gray-500">
                +{user.skills.length - 3}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
