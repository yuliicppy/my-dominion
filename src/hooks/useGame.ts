// ゲーム状態を管理するカスタムフック

import { useState } from 'react';
import { GameState } from '../game/types';
import { createInitialState, draw as engineDraw } from '../game/engine';

export function useGame() {
  const [state, setState] = useState<GameState>(() => createInitialState());

  function drawCards(n = 1) {
    setState(prev => {
      const next = { ...prev, deck: [...prev.deck], hand: [...prev.hand], discard: [...prev.discard] };
      engineDraw(next, n);
      return next;
    });
  }

  function startTurn() {
    setState(prev => {
      const next = { ...prev, deck: [...prev.deck], hand: [...prev.hand], discard: [...prev.discard] };
      next.turn = prev.turn;
      next.actions = 1;
      next.buys = 1;
      next.coins = 0;
      next.phase = 'action';
      // ドロー（標準5枚）: 手札をクリアして5枚引く簡易処理
      next.discard = [...next.discard];
      next.hand = [];
      engineDraw(next, 5);
      return next;
    });
  }

  function endTurn() {
    setState(prev => {
      // クリーンアップ: 手札を捨て札へ
      const next = {
        ...prev,
        deck: [...prev.deck],
        hand: [],
        discard: [...prev.discard, ...prev.hand],
      };

      // cleanupフェーズ表示
      next.phase = 'cleanup';

      // 次ターン開始処理をここで行う（cleanup を経て immediately start）
      next.turn = prev.turn + 1;
      next.actions = 1;
      next.buys = 1;
      next.coins = 0;
      next.phase = 'action';

      // ドロー（標準5枚）
      engineDraw(next, 5);

      return next;
    });
  }

  function playAction() {
    setState(prev => {
      if (prev.actions <= 0) return prev;
      const next = { ...prev };
      next.actions = prev.actions - 1;
      // 実際はカード効果の適用が入るが、今は仮置き
      return next;
    });
  }

  return { state, drawCards, startTurn, endTurn, playAction };
}