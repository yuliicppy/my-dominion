// ゲームエンジンの基本ロジック

import { GameState, Card, EffectDef } from './types';
import { createSupply } from './supply';
import { cardMaster } from './cardData';
import { requireCard } from './utils';

function shuffle<T>(arr: T[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

export function createInitialState(): GameState {
  // 初期デッキ: 銅貨7枚・屋敷3枚（ドミニオン第2版の初期デッキ構成）
  const copper = requireCard(cardMaster, 'copper');
  const estate = requireCard(cardMaster, 'estate');

  const deck: Card[] = [...Array(7)].map(() => copper).concat([...Array(3)].map(() => estate));
  shuffle(deck);

  // シャッフル後、上から5枚を手札に取り、残りをデッキにする
  const hand: Card[] = deck.splice(0, 5);

  return {
    deck, // 残りのカード
    hand,
    discard: [],
    inPlayTreasure: [],
    inPlayAction: [],
    supply: createSupply(cardMaster),
    turn: 1,
    // 初期のアクション管理
    actions: 1,
    buys: 1,
    coins: 0,
    phase: 'action',
  };
}

// ドロー: デッキが足りなければ捨て札をシャッフルして補充
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

export function applyEffects(state: GameState, effects: EffectDef[]): void {
  effects.forEach(effect => {
    switch(effect.kind){
      case "DrawCards":
        console.log("DrawCards effect occured")
        draw(state, effect.amount);
        break;
      default:
        console.log("Undefined effect occured");
        break;
    }
  });

}