import Link from "next/link";

import { Layout } from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-8 text-center">
          React データフロー チュートリアル
        </h1>
        
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              href="/counter" 
              className="block p-6 border rounded-lg hover:shadow-md transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
                カウンター
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                シンプルなカウンターアプリでReactの基本的な状態管理を学習
              </p>
            </Link>

            <Link 
              href="/todo" 
              className="block p-6 border rounded-lg hover:shadow-md transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-semibold mb-2 text-green-600 dark:text-green-400">
                TODO アプリ
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                TODOアプリでコンポーネント間のデータフローを理解
              </p>
            </Link>

            <Link 
              href="/user" 
              className="block p-6 border rounded-lg hover:shadow-md transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-semibold mb-2 text-purple-600 dark:text-purple-400">
                ユーザー管理
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                ユーザー情報の管理とデータ処理のパターンを学習
              </p>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
