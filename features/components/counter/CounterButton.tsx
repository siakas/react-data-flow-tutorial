type Props = {
  label: string;
  onClick: () => void;
  variant: "increment" | "decrement" | "reset";
};

// このコンポーネントの役割
// - ユーザーのアクション（クリック）を検知
// - 親から受け取った関数を実行して、親に通知
// - どんな処理をするかは知らない（関心の分離）
export const CounterButton = ({ label, onClick, variant }: Props) => {
  const baseClasses =
    "w-full py-2 px-4 rounded font-medium transition-colors cursor-pointer";

  const variantClasses = {
    increment: "bg-blue-500 hover:bg-blue-600 text-white",
    decrement: "bg-red-500 hover:bg-red-600 text-white",
    reset: "bg-gray-500 hover:bg-gray-600 text-white",
  };

  // なぜ onClick を直接実行するのか？
  // 子は「ボタンがクリックされた」ことを親に伝えるだけ
  // 実際の処理内容は親が決める
  const handleClick = () => {
    console.log(`子: "${label}" ボタンがクリックされました`);
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {label}
    </button>
  );
};
