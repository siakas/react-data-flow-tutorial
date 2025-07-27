import { Layout } from "@/components/Layout";
import { UserFilters } from "@/features/user/components/UserFilters";

export default function UserPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">
              Zustand × 親子データフロー：ユーザー管理システム
            </h1>
            <p className="mt-2 text-gray-600">
              グローバル状態と親子間通信のハイブリッドアーキテクチャ
            </p>
          </header>

          {/* データフローの可視化 */}
          {/* 可視化コンポーネント */}

          {/* 統計情報 */}
          {/* スタッツコンポーネント */}

          {/* フィルターセクション */}
          <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
            <UserFilters />
          </div>
        </div>
      </div>
    </Layout>
  );
}
