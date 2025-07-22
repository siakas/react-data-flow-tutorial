type Props = {
  todosCount: number;
  activeFilter: string;
  activeSort: string;
};

export const DataFlowDiagram = ({
  todosCount,
  activeFilter,
  activeSort,
}: Props) => {
  return (
    <div className="mb-8 rounded-lg bg-blue-50 p-6">
      <h3 className="mb-4 font-semibold">現在のデータフロー</h3>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="rounded bg-white px-2 py-1 font-mono">
            tutorial-2.tsx
          </span>
          <span>がすべての状態を管理</span>
        </div>
        <div className="ml-8 space-y-1">
          <p>→ TODOs：{todosCount} 件</p>
          <p>→ フィルター：{activeFilter}</p>
          <p>→ ソート：{activeSort}</p>
        </div>
        <div className="mt-4 rounded bg-yellow-100 p-3">
          <p className="mb-1 font-semibold">なぜ親で管理？</p>
          <p>
            複数の子コンポーネントが同じデータを必要とするため、共通の親で一元管理しています。
          </p>
        </div>
      </div>
    </div>
  );
};
