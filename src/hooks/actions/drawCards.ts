import { GameState } from '../../game/types';
import { draw } from '../../game/engine';

export function drawCards(state: GameState, n = 1) {
  draw(state, n);
}
