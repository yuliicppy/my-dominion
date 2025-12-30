# AGENTS

Codexエージェント向けのクイックガイド（日本語版）。

## プロジェクト概要
- React + TypeScript（CRA）。エントリ: `src/index.tsx`、ルートUI: `src/App.tsx` → `components/GameBoard`.
- ゲームロジック: `src/game/engine.ts`（初期デッキ・ドロー）、`src/game/supply.ts`（サプライ生成）、`src/game/cardData.ts`（カード一覧）、`src/game/types.ts`（型定義）、`src/game/utils.ts`（ユーティリティ）。
- 状態管理: `src/hooks/useGame.ts` が `GameState` を保持し、`startTurn` / `endTurn` / `drawCards` / `playAction` を提供。
- UI: `components/GameBoard.tsx` が操作ボタン・手札・サプライ（基本＋ランダム王国10山）・デバッグ用山札表示を担当。`components/Card.tsx` はタイプ別カラーでカードを描画。

## 実行とテスト
- 依存関係: `npm install`（CRA標準ツールチェーン）。
- 開発サーバー: `npm start`
- テスト: `npm test`（Jest + RTL、現状最小限）

## 現状の制約・未実装
- カード `effects` は空で、実際のアクション/購入/コイン処理は未実装。
- フェーズ管理は簡易的（`useGame`でカウンタ更新とドロー程度）。
- サプライは再生成のみで減少処理なし（購入・獲得パイプライン未実装）。

## 作業上の約束
- 可能な限りASCIIを維持。日本語コメント/文言は既存通り必要最低限で。
- 検索は `rg` 推奨。手作業編集は `apply_patch` を優先。
- 既存の日本語コメントやUI表記は尊重しつつ、ロジックが読みにくい場合のみ短いコメントを追加。
- チャットの返答は日本語で行う。

## 典型的な次の作業
- カード効果の実行: `engine.ts`/`useGame.ts` を拡張し、`cardData.ts` の `effects` を消費。
- ターン/フェーズ厳密化: action→buy→cleanup を強制し、購入処理とサプライ残数更新を実装。
- UI改善: プレイ/購入操作、ログ表示などの追加。

## その他
- スキル追加時は `$CODEX_HOME/skills/.system/` を参照。ワークスペース外の破壊的操作は禁止。

## 開発方針（ユーザー希望）
- ユーザーは写経しながら学習したいので、あなた（Codex）はコードを教えるだけで実装は行わないこと。
- まず現在のファイル内容をユーザーと確認し、変更箇所を順番に番号付きで列挙すること。
- 各変更箇所については「変更後のコードを提示」→「なぜこう変更するのかを説明」の順で進めること。
- ただし、CSSなどデザイン的な調整に関してはCodex側で実装を行うこと。
