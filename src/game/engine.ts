// ゲームエンジンの基本ロジック

import { GameState, Card } from './types';
import { sampleCards } from './cardData';

function shuffle<T>(arr: T[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

export function createInitialState(): GameState {
  // sampleCards を複製してデッキにする
  const deck = [...sampleCards, ...sampleCards];
  shuffle(deck);

  // シャッフル後、上から5枚を手札に取り、残りをデッキにする
  const hand: Card[] = deck.splice(0, 5);

  return {
    deck, // 残りのカード
    hand,
    discard: [],
    turn: 1,
    // 初期のアクション管理
    actions: 1,
    buys: 1,
    coins: 0,
    phase: 'action',
  };
}

// 簡易 draw: デッキが足りなければ捨て札をシャッフルして補充
export function draw(state: GameState, n = 1): void {
  for (let i = 0; i < n; i++) {
    if (state.deck.length === 0 && state.discard.length > 0) {
      state.deck = [...state.discard];
      state.discard = [];
      shuffle(state.deck);
    }
    const card = state.deck.shift();
    if (card) state.hand.push(card);
  }
}