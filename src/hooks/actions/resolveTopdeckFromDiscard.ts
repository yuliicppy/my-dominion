import { GameState } from '../../game/types';
import { pendingRegistry } from '../../game/effects/pending';

export function resolveTopdeckFromDiscard(
  state: GameState,
  payload: { indices: number[] }
) {
  // 想定中の pending 以外では何もしない
  if (!state.pendingEffect || state.pendingEffect.kind !== 'TopdeckFromDiscard') return;
  pendingRegistry.TopdeckFromDiscard.resolve(state, payload);
}
