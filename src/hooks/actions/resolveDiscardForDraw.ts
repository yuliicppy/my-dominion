import { GameState } from '../../game/types';
import { pendingRegistry } from '../../game/effects/pending';

export function resolveDiscardForDraw(state: GameState, indices: number[]) {
  if (!state.pendingEffect || state.pendingEffect.kind !== 'DiscardForDraw') return;
  pendingRegistry.DiscardForDraw.resolve(state, indices);
}
