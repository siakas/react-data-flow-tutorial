import { after } from "node:test";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

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
  devtools(
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

          set(
            (state) => ({
              users: [...state.users, newUser],
            }),
            undefined,
            "UserStore/addUser",
          );

          console.log("Store: 新しいユーザーを追加:", newUser);
        },

        updateUser: (id, userData) => {
          set(
            (state) => ({
              users: state.users.map((user) =>
                user.id === id
                  ? { ...user, ...userData, lastActiveAt: new Date() }
                  : user,
              ),
              selectedUser:
                state.selectedUser?.id === id
                  ? { ...state.selectedUser, ...userData }
                  : state.selectedUser,
            }),
            undefined,
            "UserStore/updateUser",
          );

          console.log("Store: ユーザーを更新:", { id, userData });
        },

        deleteUser: (id) => {
          set(
            (state) => ({
              users: state.users.filter((user) => user.id !== id),
              selectedUser:
                state.selectedUser?.id === id ? null : state.selectedUser,
            }),
            undefined,
            "UserStore/deleteUser",
          );

          console.log("Store: ユーザーを削除:", id);
        },

        selectUser: (user) => {
          set({ selectedUser: user }, undefined, "UserStore/selectUser");
        },

        setFilters: (filters) => {
          set(
            (state) => ({
              filters: { ...state.filters, ...filters },
            }),
            undefined,
            "UserStore/setFilters",
          );
        },

        resetFilters: () => {
          set({ filters: initialFilters }, undefined, "UserStore/resetFilters");
        },

        openModal: (userId) => {
          set(
            { isModalOpen: true, editingUserId: userId || null },
            undefined,
            "UserStore/openModal",
          );
        },

        closeModal: () => {
          set(
            { isModalOpen: false, editingUserId: null },
            undefined,
            "UserStore/closeModal",
          );
        },

        // 計算値
        getFilteredUsers: () => {
          const state = get();
          let filtered = state.users;

          // 検索フィルター
          if (state.filters.searchQuery) {
            const query = state.filters.searchQuery.toLowerCase();
            filtered = filtered.filter(
              (user) =>
                user.name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query),
            );
          }
          // ロールフィルター
          if (state.filters.roleFilter !== "all") {
            filtered = filtered.filter(
              (user) => user.role === state.filters.roleFilter,
            );
          }
          // ステータスフィルター
          if (state.filters.statusFilter !== "all") {
            filtered = filtered.filter(
              (user) => user.status === state.filters.statusFilter,
            );
          }
          // 部署フィルター
          if (state.filters.departmentFilter !== "all") {
            filtered = filtered.filter(
              (user) => user.department === state.filters.departmentFilter,
            );
          }
          // スキルフィルター
          if (state.filters.skillsFilter.length > 0) {
            filtered = filtered.filter((user) =>
              user.skills.some((skill) =>
                state.filters.skillsFilter.includes(skill),
              ),
            );
          }
          return filtered;
        },

        getUsersByDepartment: () => {
          const users = get().users;
          return users.reduce(
            (acc, user) => {
              if (!acc[user.department]) {
                acc[user.department] = [];
              }
              acc[user.department].push(user);
              return acc;
            },
            {} as Record<string, User[]>,
          );
        },

        getActiveUsersCount: () => {
          return get().users.filter((user) => user.status === "active").length;
        },
      }),
      {
        name: "useUserStore",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ users: state.users }), // users のみを永続化
      },
    ),
    {
      name: "useUserStore",
      enabled: process.env.NODE_ENV !== "production",
    },
  ),
);
