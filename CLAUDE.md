# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクトについて

このプロジェクトは **React データフロー学習チュートリアル** です。React の親子間データフローを理解するための教育的なリポジトリで、以下の学習内容を含みます：

- **チュートリアル①** (`tutorial-1.tsx`): 基本的なカウンターアプリを通じた親→子、子→親のデータフロー
- **チュートリアル②** (`tutorial-2.tsx`): より複雑なTODOアプリを通じた実践的なデータフロー

### 学習ポイント

- 単一方向データフローの理解
- 状態管理は親コンポーネントで行う理由
- `props` を通じたデータの受け渡し
- `onXxx` パターンでのイベント通知
- 関心の分離（子は通知のみ、親が実際の処理を担当）

## Conversation Guidelines

- 常に日本語で会話する
- 教育的な観点から、データフローの説明を重視する
- コンソールログを活用してデータの流れを可視化する

## ディレクトリ構造

```
features/
├── counter/          # チュートリアル① 用コンポーネント
│   └── components/
├── todo/             # チュートリアル② 用コンポーネント
│   ├── components/
│   └── types/
components/           # 共通コンポーネント
├── ui/               # shadcn/ui コンポーネント
└── Layout.tsx        # レイアウトコンポーネント
pages/                # Next.js Pages
├── tutorial-1.tsx    # 基礎編
└── tutorial-2.tsx    # 発展編
```

## インポートエイリアス

- `@/*` は `src/*` に解決される（tsconfig.json で設定）

## コードスタイル

### 全般

- ESLint 設定には React 固有のルールと Prettier 統合が含まれる
- Prettier の設定に従う（`.prettierrc` 参照）
- インポート順序は Prettier プラグインで自動整列される

### React/TypeScript

- React コンポーネントは可能な限り自己終了タグを使用する
- JSX の波括弧は必要な場合のみ使用
- TypeScript strict モードが有効
- 関数コンポーネントを優先する
- Props の型定義は明示的に行う

### データフロー関連の命名規則

- 親から子へ渡すイベントハンドラ: `onXxx` （例: `onAddTodo`, `onToggle`）
- 親コンポーネント内のハンドラ: `handleXxx` （例: `handleAddTodo`, `handleToggle`）
- 子コンポーネント内のハンドラ: `handleXxx` （例: `handleSubmit`, `handleClick`）

### Tailwind CSS v4

- Tailwind CSS v4 の新しい構文を使用
- `@theme` と `@variant` ディレクティブを活用
- カスタムユーティリティは `@utility` で定義
- CSS 変数は `theme()` 関数または `var()` で参照
- v4 の新しいカラーシステム（oklch）を使用

## スタイリング規則

### ダークモード

- `dark:` プレフィックスと `.dark` クラスを併用
- システム設定（`prefers-color-scheme`）もサポート
- カスタム `@variant dark` を使用

### レスポンシブデザイン

- モバイルファーストアプローチ
- Tailwind のブレークポイントを使用（sm, md, lg, xl, 2xl）

### カラー

- oklch カラースペースを優先
- `color-mix()` 関数で透明度を調整
- セマンティックなカラー変数を使用

## コンポーネント作成ガイドライン

### 命名規則

- コンポーネント: PascalCase（例: `CounterButton`, `TodoItem`）
- ファイル名: PascalCase.tsx
- Props 型: `ComponentNameProps` または `Props`
- フック: `use` プレフィックス

### コンポーネント構造

```tsx
// 1. インポート
import { ComponentProps } from "react";

// 2. 型定義
type Props = {
  // データフロー関連の Props
  count: number; // 親から受け取るデータ
  onIncrement: () => void; // 親に通知するための関数
};

// 3. コンポーネント定義（名前付きエクスポート推奨）
export const ComponentName = ({ count, onIncrement }: Props) => {
  // 内部ハンドラ（親の関数を呼び出すだけ）
  const handleIncrement = () => {
    console.log("子: インクリメントボタンがクリックされました");
    onIncrement(); // 親に通知
  };

  return <button onClick={handleIncrement}>カウント: {count}</button>;
};
```

### データフロー実装のベストプラクティス

#### 親コンポーネント

```tsx
export default function ParentComponent() {
  // 状態は親で管理
  const [count, setCount] = useState(0);

  // 子に渡すハンドラ関数
  const handleIncrement = () => {
    console.log("親: カウントを増やします");
    setCount((prev) => prev + 1);
  };

  return <ChildComponent count={count} onIncrement={handleIncrement} />;
}
```

#### 子コンポーネント

```tsx
type Props = {
  count: number;
  onIncrement: () => void;
};

export const ChildComponent = ({ count, onIncrement }: Props) => {
  // 子は親から受け取った関数を実行するだけ
  const handleClick = () => {
    console.log("子: 親に通知します");
    onIncrement(); // 実際の処理は親が担当
  };

  return (
    <div>
      <p>現在のカウント: {count}</p>
      <button onClick={handleClick}>増やす</button>
    </div>
  );
};
```

### ベストプラクティス

- コンポーネントは単一責任の原則に従う
- 複雑なロジックはカスタムフックに抽出
- `clsx` を使用して条件付きクラスを管理
- アクセシビリティ属性（aria-label など）を適切に設定
- コンソールログでデータフローを可視化（学習目的）

## 学習コンテンツ特有の注意事項

### デバッグとロギング

- 各コンポーネントでコンソールログを活用してデータの流れを明示
- 「親:」「子:」のプレフィックスでログの出力元を明確化
- イベントの発生順序が追跡できるようにする

### 教育的な説明コメント

- 複雑なデータフローには詳細なコメントを追加
- 「なぜこの設計にするのか」の理由を明記
- 初学者にもわかりやすい説明を心がける

### UI での説明表示

- データフローを可視化するための説明用UIを積極的に配置
- 現在の状態やフローの説明をユーザーに表示
- 学習効果を高めるための補助情報を提供

## Tailwind CSS v4 特有の注意点

### 新しい CSS 機能

- `@theme` ブロックでテーマ値を定義
- `@variant` でカスタムバリアントを作成
- `@utility` でカスタムユーティリティを定義
- CSS 変数による動的な値の管理

### パフォーマンス

- 不要な CSS の生成を避ける
- PostCSS プラグインは `@tailwindcss/postcss` のみ使用

## 開発時の注意事項

### 状態管理

- React Context は最小限に留める
- ローカル状態は useState/useReducer を使用
- グローバル状態が必要な場合は Context を検討
- **教育目的のため、外部状態管理ライブラリは使用しない**

### Next.js 固有

- `"use client"` ディレクティブは必要な場合のみ使用
- Server Components をデフォルトとする
- 画像最適化には next/image を使用
- フォントは next/font/local で最適化

### データフロー設計

- 状態は常に適切な親レベルで管理
- 子コンポーネントは純粋関数として設計
- プロップドリリングが深くなる場合は構造を見直す
- イベントバブリングの概念を活用

## プルリクエスト作成ガイドライン

### 重要なルール

**すべてのプルリクエストは必ず `.github/pull_request_template.md` のテンプレートに従って作成すること。**

### プルリクエストの作成手順

#### パターン1: 新規ブランチから作成する場合

1. フィーチャーブランチを作成（例: `feature/add-tutorial-3`）
2. 変更をコミット（意味のあるコミットメッセージを使用）
3. プルリクエストのタイトルは変更内容を簡潔に表現
4. 本文は必ずテンプレートのすべてのセクションを埋める
5. スクリーンショットが必要な場合は必ず添付

#### パターン2: 既存ブランチのPR作成を依頼された場合

「このブランチのプルリクエストを作成して」と依頼された場合は、**必ず以下の手順を実行する**：

1. 現在のブランチ名を確認
2. ブランチの変更内容を把握（git diff や変更ファイルから推測）
3. **GitHub CLI (`gh pr create`) または GitHub API を使用して実際にプルリクエストを作成する**
4. プルリクエスト作成時には以下を指定：

- タイトル: 変更内容を簡潔に表現
- ベースブランチ: `master` または指定されたブランチ
- 本文: テンプレートに従って完全に記入

5. プルリクエストの作成が完了したら、作成されたPRのURLを含めて以下の形式で報告：

```
✅ プルリクエストを作成しました！

**PR URL:** https://github.com/[owner]/[repo]/pull/[number]
**ブランチ:** `現在のブランチ名` → `master`
**タイトル:** [作成したPRのタイトル]

作成したプルリクエストの内容は以下の通りです：

[テンプレートに従って記入した本文全体]
```

**注意**: PR本文の出力だけでなく、実際にGitHubにプルリクエストを作成することが必須です。

### ブランチ命名規則

- 機能追加: `feature/機能名` または `tutorial/チュートリアル名`
- バグ修正: `fix/修正内容`
- ドキュメント: `docs/更新内容`
- リファクタリング: `refactor/対象`
- スタイル調整: `style/調整内容`

### コミットメッセージ

- 日本語または英語で記述
- 動詞から始める（例: "Add tutorial-3", "チュートリアル3を追加"）
- 変更理由も含める場合は、本文に記述

## デバッグとトラブルシューティング

- Tailwind CSS v4 のクラスが適用されない場合は、PostCSS の設定を確認
- ダークモードが機能しない場合は、`@variant dark` の定義を確認
- パフォーマンス問題がある場合は、不要な Client Components を確認
- データフローが期待通りに動作しない場合は、コンソールログで流れを追跡

## 追加の規則

- コミットメッセージは簡潔で分かりやすく
- 新機能追加時は既存のパターンに従う
- 教育的な価値を重視し、学習者にとって理解しやすいコードを書く
- アニメーションは控えめに使用し、`prefers-reduced-motion` を尊重
- 実装例には必ず学習ポイントを明記する
