# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクトについて

このプロジェクトは **React データフロー学習チュートリアル** です。React の親子間データフローを理解するための教育的なリポジトリで、以下の学習内容を含みます：

- **基礎編** (`counter.tsx`): 基本的なカウンターアプリを通じた親→子、子→親のデータフロー
- **発展編** (`todo.tsx`): より複雑なTODOアプリを通じた実践的なデータフロー
- **実践編** (`user.tsx`): Zustand を使用したグローバル状態管理と親子データフローのハイブリッドアーキテクチャ

### 学習ポイント

- 単一方向データフローの理解
- 状態管理は親コンポーネントで行う理由
- `props` を通じたデータの受け渡し
- `onXxx` パターンでのイベント通知
- 関心の分離（子は通知のみ、親が実際の処理を担当）
- Zustand によるグローバル状態管理
- ローカル状態とグローバル状態の使い分け
- ハイブリッドアーキテクチャの実装パターン

## Conversation Guidelines

- 常に日本語で会話する
- 教育的な観点から、データフローの説明を重視する
- コンソールログを活用してデータの流れを可視化する

## ディレクトリ構造

```
features/
├── counter/          # 基礎編用コンポーネント
│   └── components/
│       ├── CounterButton.tsx
│       └── CounterDisplay.tsx
├── todo/             # 発展編用コンポーネント
│   ├── components/
│   │   ├── DataFlowDiagram.tsx
│   │   ├── TodoFilter.tsx
│   │   ├── TodoInput.tsx
│   │   ├── TodoItem.tsx
│   │   ├── TodoList.tsx
│   │   └── TodoStats.tsx
│   └── types/
│       └── index.ts
├── user/             # 実践編用コンポーネント
│   ├── components/
│   │   ├── UserCard.tsx
│   │   ├── UserFilters.tsx
│   │   ├── UserList.tsx
│   │   └── UserModal.tsx
│   ├── stores/
│   │   └── UserStore.ts
│   └── types/
│       └── index.ts
components/           # 共通コンポーネント
├── ui/               # shadcn/ui コンポーネント
│   └── button.tsx
└── Layout.tsx        # レイアウトコンポーネント
pages/                # Next.js Pages
├── counter.tsx       # 基礎編
├── todo.tsx          # 発展編
├── user.tsx          # 実践編
└── index.tsx         # ホームページ
```

## インポートエイリアス

- `@/*` は `src/*` に解決される（tsconfig.json で設定）

## コードスタイル

### 全般

- ESLint 設定には React 固有のルールと Prettier 統合が含まれる
- Prettier の設定に従う（`.prettierrc` 参照）
- インポート順序は Prettier プラグインで自動整列される
- pnpm をパッケージマネージャーとして使用

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

- ローカル状態は useState/useReducer を使用
- グローバル状態管理には Zustand を使用
- **状態の責務を明確に分離**：
  - UI状態（表示モード、フィルター条件など）→ ローカル状態
  - アプリケーション状態（ユーザー情報、選択状態など）→ グローバル状態
- React Context は最小限に留める

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

### PRテンプレートの必須項目

プルリクエスト作成時は、以下のすべてのセクションを必ず記入する：

1. **📝 概要**: 変更内容の簡潔な説明
2. **🎯 関連Issue**: 関連するIssue番号（ない場合は「N/A」）
3. **📋 変更内容**: 主な変更点をチェックリスト形式で記載
4. **🏷️ 変更の種類**: 該当する変更タイプにチェック
5. **📸 スクリーンショット**: UI変更がある場合は変更前後の画像（ない場合は見出しごと削除）
6. **🧪 動作確認**: 実施した動作確認項目にチェック
7. **📌 レビュアーへの注意事項**: 特に確認してほしい点（ない場合は見出しごと削除）
8. **✅ チェックリスト**: すべての項目を確認してチェック

### プルリクエストの作成手順

#### パターン1: 新規ブランチから作成する場合

1. フィーチャーブランチを作成（例: `feature/add-tutorial-3`）
2. 変更をコミット（意味のあるコミットメッセージを使用）
3. プルリクエストのタイトルは変更内容を簡潔に表現
4. 本文は必ずテンプレートのすべてのセクションを埋める
5. UI変更がある場合はスクリーンショットを必ず添付

#### パターン2: 既存ブランチのPR作成を依頼された場合

「このブランチのプルリクエストを作成して」と依頼された場合は、**必ず以下の手順を実行する**：

1. 現在のブランチ名を確認
2. ブランチの変更内容を把握（git diff や変更ファイルから推測）
3. **GitHub CLI (`gh pr create`) または GitHub API を使用して実際にプルリクエストを作成する**
4. プルリクエスト作成時には以下を指定：

   - タイトル: 変更内容を簡潔に表現
   - ベースブランチ: `master` または指定されたブランチ
   - 本文: **テンプレートの該当セクションを完全に記入**（内容がない場合は見出しごと削除）

5. 実際のプルリクエスト作成時は `gh pr create` コマンドでHEREDOCを使用：

```bash
gh pr create --title "タイトル" --body "$(cat <<'EOF'
## 📝 概要

[変更内容の説明]

## 🎯 関連Issue

- Closes #[番号] または N/A

## 📋 変更内容

- [x] [実施した変更1]
- [x] [実施した変更2]

## 🏷️ 変更の種類

- [x] [該当する種類]

## 🧪 動作確認

- [x] ローカル環境での動作確認
- [x] [その他実施した確認項目]

## ✅ チェックリスト

- [x] コードは既存のコーディング規約に従っている
- [x] セルフレビューを実施した
- [x] [その他確認済み項目]
EOF
)"

# 📸 スクリーンショットセクションがある場合の例
## 📸 スクリーンショット

### 変更前
[スクリーンショット]

### 変更後
[スクリーンショット]

# 📌 レビュアーへの注意事項がある場合の例
## 📌 レビュアーへの注意事項

[具体的な注意事項]
```

6. プルリクエストの作成が完了したら、作成されたPRのURLを含めて報告

**注意**: 
- PR本文の出力だけでなく、実際にGitHubにプルリクエストを作成することが必須
- 該当しないセクション（スクリーンショット、レビュアーへの注意事項など）は見出しごと削除する
- 必須セクションは必ず記入し、空欄を残さない
- チェックボックスは適切に `[x]` でマークする

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

## ライブラリとツール

### 使用ライブラリ

- **フレームワーク**: Next.js 15.4.2（React 19.1.0）
- **状態管理**: Zustand 5.0.6
- **スタイリング**: Tailwind CSS v4.1.11
- **UI コンポーネント**: Radix UI（@radix-ui/react-slot）
- **アイコン**: Lucide React
- **ユーティリティ**: 
  - clsx（条件付きクラス）
  - tailwind-merge（クラスのマージ）
  - class-variance-authority（バリアント管理）

### 開発ツール

- **TypeScript**: 5.8.3（strict モード有効）
- **ESLint**: 9.32.0（Next.js設定 + Prettier統合）
- **Prettier**: 3.6.2（Tailwind CSS プラグイン含む）
- **パッケージマネージャー**: pnpm
- **Node.js**: 22.17.0（Volta で管理）

### 開発コマンド

```bash
# 開発サーバー起動
pnpm dev

# プロダクションビルド
pnpm build

# リント実行
pnpm lint

# フォーマット実行
pnpm format

# ライブラリアップデート（インタラクティブ）
pnpm lib:update
```

## Zustand 使用ガイドライン

### ストア設計原則

- **単一責任**: 1つのストアは1つの関心事を担当
- **最小限の状態**: 必要最小限の状態のみを保持
- **派生状態の回避**: 計算可能な値はセレクターで取得

### ストア実装パターン

```tsx
// stores/UserStore.ts
import { create } from 'zustand';

type UserState = {
  // 状態
  users: User[];
  selectedUser: User | null;
  isModalOpen: boolean;
  
  // アクション
  setUsers: (users: User[]) => void;
  selectUser: (user: User) => void;
  openModal: () => void;
  closeModal: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  // 初期状態
  users: [],
  selectedUser: null,
  isModalOpen: false,
  
  // アクション実装
  setUsers: (users) => set({ users }),
  selectUser: (user) => set({ selectedUser: user }),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false, selectedUser: null }),
}));
```

### ストア使用パターン

```tsx
// コンポーネントでの使用
const Component = () => {
  // 必要な状態とアクションのみを選択
  const users = useUserStore((state) => state.users);
  const selectUser = useUserStore((state) => state.selectUser);
  
  // ローカル状態との組み合わせ
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  return (
    <div>
      {/* グローバル状態を使用 */}
      {users.map(user => (
        <UserCard key={user.id} user={user} onSelect={selectUser} />
      ))}
    </div>
  );
};
```

## 追加の規則

- コミットメッセージは簡潔で分かりやすく
- 新機能追加時は既存のパターンに従う
- 教育的な価値を重視し、学習者にとって理解しやすいコードを書く
- アニメーションは控えめに使用し、`prefers-reduced-motion` を尊重
- 実装例には必ず学習ポイントを明記する
- Zustand の使用時は状態の責務分離を明確にする
