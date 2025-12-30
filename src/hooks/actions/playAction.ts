import { GameState } from '../../game/types';
import { applyEffects } from '../../game/engine';

export function playAction(state: GameState, cardId: string) {
  if (state.phase !== 'action' || state.actions <= 0) return;

  const handIdx = state.hand.findIndex(c => c.id === cardId && c.types.includes('Action'));
  if (handIdx === -1) return;

  const card = state.hand.splice(handIdx, 1)[0];
  state.inPlayAction.push(card);
  state.actions -= 1;

  applyEffects(state, card.effects);
}
