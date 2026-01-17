import { GameState } from '../../game/types';
import { pendingRegistry } from '../../game/effects/pending';

export function resolveGainCard(state: GameState, payload: { pile: 'basic' | 'kingdom'; index: number }) {
  if (!state.pendingEffect || state.pendingEffect.kind !== 'GainCard') return;
  pendingRegistry.GainCard.resolve(state, payload);
}
