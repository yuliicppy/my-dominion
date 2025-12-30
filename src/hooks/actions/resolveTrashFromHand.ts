import { GameState } from '../../game/types';
import { pendingRegistry } from '../../game/effects/pending';

export function resolveTrashFromHand(state: GameState, indices: number[]) {
  if (!state.pendingEffect || state.pendingEffect.kind !== 'TrashFromHand') return;
  pendingRegistry.TrashFromHand.resolve(state, indices);
}
