import { GameState } from '../../game/types';

export function playAllTreasures(state: GameState) {
  if (state.phase !== 'action' && state.phase !== 'buy') return;

  const treasures = state.hand.filter(c => c.types.includes('Treasure'));
  if (treasures.length === 0) return;

  state.hand = state.hand.filter(c => !c.types.includes('Treasure'));
  state.inPlayTreasure.push(...treasures);
  state.coins += treasures.reduce((sum, c) => sum + (c.value ?? 0), 0);
  state.phase = 'buy';
}
