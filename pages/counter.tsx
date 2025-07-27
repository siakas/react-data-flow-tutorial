import { useState } from "react";

import { Layout } from "@/components/Layout";
import { CounterButton } from "@/features/counter/components/CounterButton";
import { CounterDisplay } from "@/features/counter/components/CounterDisplay";

export default function CounterPage() {
  // 親コンポーネントが状態を管理
  const [count, setCount] = useState(0);

  // 子コンポーネントに渡す関数
  const handleIncrement = () => {
    setCount((prev) => prev + 1);
    console.log("親: カウントを増やしました");
  };
  const handleDecrement = () => {
    setCount((prev) => prev - 1);
    console.log("親: カウントを減らしました");
  };
  const handleReset = () => {
    setCount(0);
    console.log("親: カウントをリセットしました");
  };

  return (
    <Layout>
      <div className="mx-auto max-w-4xl">
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
          <div className="w-[32rem] rounded-lg bg-white p-8 shadow-lg">
            <h1 className="mb-6 text-center text-2xl font-bold">
              親子間データフロー：基礎編
            </h1>

            {/* データの流れを可視化 */}
            <div className="mb-6 rounded bg-blue-50 p-4 text-sm">
              <p className="mb-2 font-semibold">データの流れ：</p>
              <ol className="leading-relaxed">
                <li className="my-1">
                  1. 親が <code>count = {count}</code> を持っている
                </li>
                <li className="my-1">2. 親が子に値と関数を渡す</li>
                <li className="my-1">3. 子がイベントを発火</li>
                <li className="mt-1">4. 親の状態が更新される</li>
              </ol>
            </div>

            {/* 子コンポーネント 1: 表示専用 */}
            {/* この子は親から受け取った値を表示するだけ */}
            <CounterDisplay count={count} />

            {/* 子コンポーネント 2：イベントを発火 */}
            {/* この子は親から受け取った関数を実行するだけ */}
            <div className="space-y-2">
              <CounterButton
                label="増やす"
                onClick={handleIncrement}
                variant="increment"
              />
              <CounterButton
                label="減らす"
                onClick={handleDecrement}
                variant="decrement"
              />
              <CounterButton
                label="リセット"
                onClick={handleReset}
                variant="reset"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
