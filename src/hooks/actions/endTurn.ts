import { GameState } from '../../game/types';
import { draw } from '../../game/engine';

export function endTurn(state: GameState) {
  // クリーンアップ: 手札とプレーしたカードを捨て札へ
  state.discard = [...state.discard, ...state.hand, ...state.inPlayTreasure, ...state.inPlayAction];
  state.hand = [];
  state.inPlayTreasure = [];
  state.inPlayAction = [];

  // 次ターン開始
  state.turn += 1;
  state.actions = 1;
  state.buys = 1;
  state.coins = 0;
  state.phase = 'action';
  state.pendingEffect = null;

  draw(state, 5);
}
