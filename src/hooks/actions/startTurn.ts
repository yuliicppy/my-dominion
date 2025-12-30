import { GameState } from '../../game/types';
import { draw } from '../../game/engine';

export function startTurn(state: GameState) {
  state.actions = 1;
  state.buys = 1;
  state.coins = 0;
  state.phase = 'action';
  state.pendingEffect = null;

  // 手札を空にして5枚ドロー
  state.hand = [];
  draw(state, 5);
}
