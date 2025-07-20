# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## Conversation Guidelines

- 常に日本語で会話する

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

- コンポーネント: PascalCase（例: `ThemeToggle`）
- ファイル名: PascalCase.tsx
- Props 型: `ComponentNameProps`
- フック: `use` プレフィックス

### コンポーネント構造

```tsx
// 1. インポート
import { ComponentProps } from "react";

// 2. 型定義
type ComponentNameProps = {
  // ...
};

// 3. コンポーネント定義（名前付きエクスポート推奨）
export const ComponentName = (props: ComponentNameProps) => {
  // ...
};
```

### ベストプラクティス

- コンポーネントは単一責任の原則に従う
- 複雑なロジックはカスタムフックに抽出
- `clsx` を使用して条件付きクラスを管理
- アクセシビリティ属性（aria-label など）を適切に設定

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

### Next.js 固有

- `"use client"` ディレクティブは必要な場合のみ使用
- Server Components をデフォルトとする
- 画像最適化には next/image を使用
- フォントは next/font/local で最適化

### テーマ切り替え

- localStorage でテーマ設定を永続化
- SSR/SSG 時のちらつきを防ぐため、スクリプトタグで初期化
- system/light/dark の 3 つのモードをサポート

## プルリクエスト作成ガイドライン

### 重要なルール

**すべてのプルリクエストは必ず `.github/pull_request_template.md` のテンプレートに従って作成すること。**

### プルリクエストの作成手順

#### パターン1: 新規ブランチから作成する場合

1. フィーチャーブランチを作成（例: `feature/add-navigation-menu`）
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

- 機能追加: `feature/機能名`
- バグ修正: `fix/修正内容`
- ドキュメント: `docs/更新内容`
- リファクタリング: `refactor/対象`
- スタイル調整: `style/調整内容`

### コミットメッセージ

- 日本語または英語で記述
- 動詞から始める（例: "Add navigation menu", "ナビゲーションメニューを追加"）
- 変更理由も含める場合は、本文に記述

## デバッグとトラブルシューティング

- Tailwind CSS v4 のクラスが適用されない場合は、PostCSS の設定を確認
- ダークモードが機能しない場合は、`@variant dark` の定義を確認
- パフォーマンス問題がある場合は、不要な Client Components を確認

## 追加の規則

- コミットメッセージは簡潔で分かりやすく
- 新機能追加時は既存のパターンに従う
- ドキュメントサイトとしての読みやすさを重視
- アニメーションは控えめに使用し、`prefers-reduced-motion` を尊重
