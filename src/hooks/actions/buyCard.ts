import { GameState } from '../../game/types';

export function buyCard(state: GameState, pile: 'basic' | 'kingdom', index: number) {
  if (state.phase !== 'buy') return;
  if (state.buys <= 0) return;

  const pileArr = state.supply[pile];
  if (index < 0 || index >= pileArr.length) return;

  const targetPile = pileArr[index];
  if (targetPile.count <= 0) return;
  const card = targetPile.card;
  if (state.coins < card.cost) return;

  // 購入処理
  state.supply[pile][index] = { ...targetPile, count: targetPile.count - 1 };
  state.coins -= card.cost;
  state.buys -= 1;
  state.discard.push(card);
}
