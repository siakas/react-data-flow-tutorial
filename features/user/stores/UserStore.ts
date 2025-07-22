import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { User, UserFilters, UserFormData } from "@/features/user/types";

type UserStore = {
  // 状態
  users: User[];
  selectedUser: User | null;
  filters: UserFilters;
  isModalOpen: boolean;
  editingUserId: string | null;

  // アクション
  addUser: (userData: UserFormData) => void;
  updateUser: (id: string, userData: Partial<User>) => void;
  deleteUser: (id: string) => void;
  selectUser: (user: User | null) => void;
  setFilters: (filters: Partial<UserFilters>) => void;
  resetFilters: () => void;
  openModal: (userId?: string) => void;
  closeModal: () => void;

  // 計算値を返す関数
  getFilteredUsers: () => User[];
  getUsersByDepartment: () => Record<string, User[]>;
  getActiveUsersCount: () => number;
};

const initialFilters: UserFilters = {
  searchQuery: "",
  roleFilter: "all",
  statusFilter: "all",
  departmentFilter: "all",
  skillsFilter: [],
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      // 初期状態
      users: [],
      selectedUser: null,
      filters: initialFilters,
      isModalOpen: false,
      editingUserId: null,

      // アクション実装
      addUser: (userData) => {
        const newUser: User = {
          ...userData,
          id: crypto.randomUUID(),
          status: "active",
          joinedAt: new Date(),
          lastActiveAt: new Date(),
        };

        set((state) => ({
          users: [...state.users, newUser],
        }));

        console.log("Store: 新しいユーザーを追加:", newUser);
      },

      updateUser: (id, userData) => {
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id
              ? { ...user, ...userData, lastActiveAt: new Date() }
              : user,
          ),
          selectedUser:
            state.selectedUser?.id === id
              ? { ...state.selectUser, ...userData }
              : state.selectedUser,
        }));

        console.log("Store: ユーザーを更新:", { id, userData });
      },
    }),
    {
      name: "useUserStore",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ users: state.users }), // users のみを永続化
    },
  ),
);
