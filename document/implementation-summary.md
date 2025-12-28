# 現在の実装概要

React + TypeScript（CRA）でドミニオン風のソロプレイ用簡易実装。UIは `GameBoard`、ロジックは `game/` 配下に分離。

## エントリとUI
- `src/App.tsx`：`GameBoard` を表示するだけのラッパー。
- `src/components/GameBoard.tsx`：ターン操作ボタン（Start Turn/Play Action/Draw/End Turn/サプライ再生成）、手札表示、サプライ表示（基本＋ランダム王国10山）、デッキのデバッグ表示を持つ。
- `src/components/Card.tsx`：カード1枚をタイプ別カラーで表示するプレゼンテーションコンポーネント。

## 状態管理フック
- `src/hooks/useGame.ts`：`GameState` を useState で保持。`drawCards`（山札からn枚引く）、`startTurn`（アクション/購入/コインを初期化し5枚ドロー）、`endTurn`（手札を捨て、ターン+1して5枚ドロー）、`playAction`（アクション数を1減らすのみ）を提供。購入処理やカード効果の解決は未実装。

## ゲームロジック
- `src/game/engine.ts`：初期デッキ生成（銅貨7/屋敷3をシャッフルし手札5枚）、`draw` で山札不足時に捨て札をシャッフル補充してドローする最低限の処理のみ。
- `src/game/supply.ts`：基本サプライ（銅/銀/金）を固定枚数で用意し、基本サプライ以外のカードからランダムに10種を選んで各10枚の王国サプライを作成。
- `src/game/cardData.ts`：基本セットのカード一覧。`effects` は現状すべて空でテキスト説明のみ。
- `src/game/types.ts`：カード・ゲーム状態の型定義。カードタイプ、条件・効果の型、`GameState`（デッキ/手札/捨て札、ターン、アクション・購入・コイン、フェーズ）。
- `src/game/utils.ts`：`requireCard` でカードIDをプールから必須取得（見つからなければ例外）。

## 未実装・制約
- カード効果の解決ロジック（`effects` を消費）は未実装。
- フェーズ管理は緩く、購入・獲得・コイン計算やサプライの減算処理は未実装。
- AI/複数プレイヤーや終了条件チェックなども未対応。
