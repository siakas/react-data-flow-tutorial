import { FormEvent, useEffect, useState } from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

import { useUserStore } from "@/features/user/stores/UserStore";
import { UserFormData, UserRole } from "@/features/user/types";

export const UserModal = () => {
  const isModalOpen = useUserStore((state) => state.isModalOpen);
  const editingUserId = useUserStore((state) => state.editingUserId);
  const users = useUserStore((state) => state.users);
  const addUser = useUserStore((state) => state.addUser);
  const updateUser = useUserStore((state) => state.updateUser);
  const closeModal = useUserStore((state) => state.closeModal);

  // 編集対象のユーザーを取得
  const editingUser = editingUserId
    ? users.find((u) => u.id === editingUserId)
    : null;

  // ローカル状態（フォーム入力値）
  const [formData, setFormData] = useState<UserFormData>({
    email: "",
    name: "",
    role: "viewer",
    department: "",
    skills: [],
  });

  const [skillInput, setSkillInput] = useState("");
  const [errors, setErrors] = useState<Partial<UserFormData>>({});

  // 編集モードの場合、初期値を設定
  useEffect(() => {
    if (editingUser) {
      setFormData({
        email: editingUser.email,
        name: editingUser.name,
        role: editingUser.role,
        department: editingUser.department,
        skills: editingUser.skills,
      });
    }
  }, [editingUser]);

  // バリデーション
  const validate = (): boolean => {
    const newErrors: Partial<UserFormData> = {};

    if (!formData.email.trim()) {
      newErrors.email = "メールアドレスは必須です";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "メールアドレスの形式が正しくありません";
    }

    if (!formData.name.trim()) {
      newErrors.name = "名前は必須です";
    }

    if (!formData.department.trim()) {
      newErrors.department = "部署は必須です";
    }

    // 編集時は同じメールアドレスを許可
    if (!editingUser) {
      const emailExists = users.some((u) => u.email === formData.email);
      if (emailExists) {
        newErrors.email = "このメールアドレスは既に使用されています";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // フォーム送信
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    if (editingUser) {
      updateUser(editingUser.id, formData);
      console.log("Modal: ユーザーを更新", formData);
    } else {
      addUser(formData);
      console.log("Modal: 新規ユーザーを追加", formData);
    }

    closeModal();
  };

  // スキル追加
  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()],
      });
      setSkillInput("");
    }
  };

  // スキル削除
  const handleRemoveSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  if (!isModalOpen) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="mx-4 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white p-6">
        <h3 className="mb-6 text-xl font-semibold">
          {editingUser ? "ユーザー編集" : "新規ユーザー作成"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* メールアドレス */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              メールアドレス <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={cn(
                "w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500",
                errors.email ? "border-red-500" : "",
              )}
              disabled={!!editingUser} // 編集時はメールアドレス変更不可
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* 名前 */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              名前 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={cn(
                "w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500",
                errors.name ? "border-red-500" : "",
              )}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* ロール */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              ロール <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value as UserRole })
              }
              className="w-full cursor-pointer rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="viewer">閲覧者</option>
              <option value="editor">編集者</option>
              <option value="admin">管理者</option>
            </select>
          </div>

          {/* 部署 */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              部署 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
              className={cn(
                "w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500",
                errors.department ? "border-red-500" : "",
              )}
              placeholder="例: 営業部"
            />
            {errors.department && (
              <p className="mt-1 text-sm text-red-500">{errors.department}</p>
            )}
          </div>

          {/* スキル */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              スキル
            </label>
            <div className="mb-2 flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                className="flex-1 rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="スキルを入力"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="cursor-pointer rounded-lg bg-gray-200 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-300"
              >
                追加
              </button>
            </div>

            {/* 追加されたスキル */}
            {formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                  >
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2 cursor-pointer text-blue-600 hover:text-blue-800"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 説明 */}
          <div className="rounded bg-green-50 p-3 text-sm">
            <p className="mb-1 font-semibold">📝 ローカル状態での入力管理</p>
            <p>
              フォームの入力値は一時的にローカル状態で管理し、送信時にZustandのアクションを呼び出します。
            </p>
          </div>

          {/* ボタン */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={closeModal}
              className="cursor-pointer rounded-lg bg-gray-200 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-300"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
            >
              {editingUser ? "更新" : "作成"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
