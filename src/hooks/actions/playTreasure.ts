import { GameState } from '../../game/types';

export function playTreasure(state: GameState, cardId: string) {
  if (state.phase !== 'action' && state.phase !== 'buy') return;

  const handIdx = state.hand.findIndex(c => c.id === cardId);
  if (handIdx === -1) return;

  const card = state.hand[handIdx];
  if (!card.types.includes('Treasure')) return;

  state.hand.splice(handIdx, 1);
  state.inPlayTreasure.push(card);
  state.coins += card.value ?? 0;
  state.phase = 'buy';
}
