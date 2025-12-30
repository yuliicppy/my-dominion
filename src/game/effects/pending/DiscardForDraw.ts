import { GameState } from '../../types';
import { draw } from '../../engine';

export const discardForDrawPending = {
  init(state: GameState) {
    state.pendingEffect = { kind: 'DiscardForDraw' };
  },
  resolve(state: GameState, indices: number[]) {
    const unique = Array.from(new Set(indices))
      .filter(i => i >= 0 && i < state.hand.length)
      .sort((a, b) => b - a);
    const discarded = unique.map(i => state.hand.splice(i,1)[0]).filter(Boolean);
    state.discard.push(...discarded);
    draw(state, discarded.length);
    state.pendingEffect = null;
  },
};
