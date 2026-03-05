import { GameState, EffectDef } from '../../types';

export const topdeckFromDiscardPending = {
  init(state: GameState, effect: EffectDef) {
    if (effect.kind !== 'TopdeckFromDiscard') return;
    state.pendingEffect = {
      kind: 'TopdeckFromDiscard',
      max: effect.max,
      optional: effect.optional ?? false,
    };
  },
  resolve(state: GameState, payload: { indices: number[] }) {
    if (!state.pendingEffect || state.pendingEffect.kind !== 'TopdeckFromDiscard') return;

    const { max } = state.pendingEffect;
    const unique = Array.from(new Set(payload.indices))
      .filter(i => i >= 0 && i < state.discard.length)
      .slice(0, max)
      .sort((a, b) => b - a);

    const picked = unique.map(i => state.discard.splice(i, 1)[0]).filter(Boolean);
    state.deck.unshift(...picked.reverse());
    state.pendingEffect = null;
  },
};