type Props = {
  count: number;
};

// このコンポーネントの役割
// - 親から受け取った値を表示するだけ
// - 自分で状態を持たない（ステートレス）
// - どこでも再利用可能
export const CounterDisplay = ({ count }: Props) => {
  return (
    <div className="mb-6 text-center">
      <p className="mb-2 text-gray-600">現在のカウント</p>
      <p className="text-4xl font-bold text-blue-600">{count}</p>
      <p className="mt-2 text-xs text-gray-500">
        ※子は親から受け取った値を表示するだけ
      </p>
    </div>
  );
};
