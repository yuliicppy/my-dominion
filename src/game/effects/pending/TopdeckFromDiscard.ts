import { GameState, EffectDef } from '../../types';

export const topdeckFromDiscardPending = {
  init(state: GameState, effect: EffectDef) {
    if (effect.kind !== 'TopdeckFromDiscard') return;
    // カード効果の指定値を pending に保持し、UIで解決させる
    state.pendingEffect = {
      kind: 'TopdeckFromDiscard',
      max: effect.max,
      optional: effect.optional ?? false,
    };
  },
  resolve(state: GameState, payload: { indices: number[] }) {
    if (!state.pendingEffect || state.pendingEffect.kind !== 'TopdeckFromDiscard') return;

    const { max } = state.pendingEffect;
    // 重複や不正indexを除去して、上限枚数までに絞る
    const unique = Array.from(new Set(payload.indices))
      .filter(i => i >= 0 && i < state.discard.length)
      .slice(0, max)
      .sort((a, b) => b - a);

    const picked = unique.map(i => state.discard.splice(i, 1)[0]).filter(Boolean);
    // 先に選んだカードが一番上になるよう順序を調整して積む
    state.deck.unshift(...picked.reverse());
    state.pendingEffect = null;
  },
};
