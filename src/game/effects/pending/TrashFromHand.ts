import { GameState, PendingEffect } from '../../types';

export const trashFromHandPending = {
  init(state: GameState, effect: PendingEffect | any) {
    state.pendingEffect = { kind: 'TrashFromHand', max: effect.max };
  },
  resolve(state: GameState, indices: number[]) {
    if (!state.pendingEffect || state.pendingEffect.kind !== 'TrashFromHand') return;
    const max = state.pendingEffect.max;
    const unique = Array.from(new Set(indices))
      .filter(i => i >= 0 && i < state.hand.length)
      .slice(0, max)
      .sort((a,b) => b - a);
    const trashed = unique.map(i => state.hand.splice(i,1)[0]).filter(Boolean);
    state.trash.push(...trashed);
    state.pendingEffect = null;
  },
};
