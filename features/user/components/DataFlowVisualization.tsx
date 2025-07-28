import { XIcon } from "lucide-react";

type Props = {
  onClose: () => void;
};

export const DataFlowVisualization = ({ onClose }: Props) => {
  return (
    <div className="relative mb-8 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-6">
      <button
        className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700"
        onClick={onClose}
      >
        <XIcon className="size-3" />
      </button>

      <h3 className="mb-4 text-lg font-semibold">
        🏗️ アーキテクチャ：Zustand + 親子間通信
      </h3>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Zustandで管理 */}
        <div className="rounded-lg bg-white p-4">
          <h4 className="mb-3 font-semibold text-purple-700">
            🌍 グローバル状態（Zustand）
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-purple-500">•</span>
              <div>
                <strong>ユーザーデータ</strong>
                <p className="text-gray-600">全てのユーザー情報、CRUD操作</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500">•</span>
              <div>
                <strong>フィルター状態</strong>
                <p className="text-gray-600">検索、ロール、ステータスなど</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500">•</span>
              <div>
                <strong>選択中のユーザー</strong>
                <p className="text-gray-600">詳細表示用の選択状態</p>
              </div>
            </li>
          </ul>
        </div>

        {/* 親子間で管理 */}
        <div className="rounded-lg bg-white p-4">
          <h4 className="mb-3 font-semibold text-blue-700">
            🔄 ローカル状態（親子間通信）
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <div>
                <strong>表示モード</strong>
                <p className="text-gray-600">グリッド/リスト表示の切替</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <div>
                <strong>フォーム入力値</strong>
                <p className="text-gray-600">一時的な入力データ</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <div>
                <strong>UI制御フラグ</strong>
                <p className="text-gray-600">削除確認、編集モードなど</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-yellow-50 p-4">
        <p className="mb-2 text-sm font-semibold">💡 使い分けの原則</p>
        <ul className="space-y-1 text-sm">
          <li>
            • <strong>ビジネスロジック</strong> →
            Zustand（複数コンポーネントで共有）
          </li>
          <li>
            • <strong>UI状態</strong> → ローカル状態（特定のコンポーネントのみ）
          </li>
          <li>
            • <strong>一時的なデータ</strong> → ローカル状態（フォーム入力など）
          </li>
        </ul>
      </div>
    </div>
  );
};
