// カード・ゲーム状態の型定義

// カードタイプの定義
type CardType = "Action" | "Treasure" | "Victory" | "Attack" | "Reaction" | "Curse";

// 効果発動条件の定義
type Condition =
  | { kind: "Always" }
  | { kind: "HandSizeAtLeast"; value: number }
  | { kind: "DeckNotEmpty" }
  | { kind: "HasTypeInPlay"; cardType: CardType };

// カード効果の定義
type EffectDef =
  | { kind: "DrawCards"; amount: number } // カードを引く
  | { kind: "AddActions"; amount: number } // アクションを増やす
  | { kind: "AddBuys"; amount: number } // 購入回数を増やす
  | { kind: "AddCoins"; amount: number } // コインを増やす
  | { kind: "GainCard"; maxCost: number; destination: "discard" | "hand" } // カードを獲得する
  | { kind: "TrashCard"; amount: number; from: "hand" } // カードを廃棄する
  | ConditionalEffect // 特殊処理: 条件付き効果 => if表現
  | RepeatEffect; // 特殊処理: 繰り返し効果 => loop表現


// 条件付き効果の定義
type ConditionalEffect = {
  kind: "If";
  condition: Condition;
  then: EffectDef[];
  else?: EffectDef[];
};

// 繰り返し効果の定義
type RepeatEffect = {
  kind: "Repeat";
  times?: number;
  until?: Condition;
  effect: EffectDef;
};

// カードの定義
export type Card = {
  id: string; // 内部ID
  name: string; // 表示用カード名
  types: CardType[];
  cost: number;
  value?: number; // 財宝が生むコイン値
  description?: string; // カードの効果説明

  effects: EffectDef[]; // 効果定義

  // 追加: 収録拡張パック名（例: 'Base', 'Intrigue' など）
  expansion: string;

  // 追加: 基本サプライか（銅貨/銀貨/金貨/勝利/呪い）
  isBasicSupply: boolean;
};

import { SupplyPile } from './supply';

export type GameState = {
  deck: Card[]; // 山札
  hand: Card[]; // 手札
  discard: Card[]; // 捨て札
  inPlayTreasure: Card[]; // プレーしたカード(財宝)
  supply: { basic: SupplyPile[]; kingdom: SupplyPile[]}; // サプライ

  turn: number; // 現在のターン数

  // アクション管理用
  actions: number;
  buys: number;
  coins: number;
  phase: 'action' | 'buy' | 'cleanup';
};