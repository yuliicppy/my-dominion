import { GameState, EffectDef } from '../../types';

export const gainCardPending = {
  init(state: GameState, effect: EffectDef) {
    if (effect.kind !== 'GainCard') return;
    state.pendingEffect = { kind: 'GainCard', maxCost: effect.maxCost, destination: effect.destination };
  },
  resolve(state: GameState, payload: { pile: 'basic' | 'kingdom'; index: number }) {
    if (!state.pendingEffect || state.pendingEffect.kind !== 'GainCard') return;

    // 選択された山が条件を満たすか検証して、サプライから獲得する
    const { maxCost, destination } = state.pendingEffect;
    const pileArr = state.supply[payload.pile];
    const target = pileArr[payload.index];
    if (!target || target.count <= 0) return;
    if (target.card.cost > maxCost) return;

    state.supply[payload.pile][payload.index] = { ...target, count: target.count - 1 };
    if (destination === 'hand') state.hand.push(target.card);
    else state.discard.push(target.card);

    state.pendingEffect = null;
  },
};
