// ゲーム状態を管理するカスタムフック

import { useState } from 'react';
import { GameState } from '../game/types';
import { createInitialState, draw as engineDraw, applyEffects } from '../game/engine';

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
      // クリーンアップ: 手札とプレーした財宝を捨て札へ
      const next = {
        ...prev,
        deck: [...prev.deck],
        hand: [],
        discard: [...prev.discard, ...prev.hand, ...prev.inPlayTreasure, ...prev.inPlayAction],
        inPlayTreasure: [],
        inPlayAction: [],
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

  function playAction(cardId: string) {
    setState(prev => {
      if (prev.phase !== 'action' || prev.actions <= 0) return prev;

      const handIdx = prev.hand.findIndex(c => c.id === cardId && c.types.includes('Action'));
      if(handIdx === -1) return prev;

      const next: GameState = {
        ...prev,
        deck: [...prev.deck],
        hand: [...prev.hand],
        discard: [...prev.discard],
        inPlayTreasure: [...prev.inPlayTreasure],
        inPlayAction: [...prev.inPlayAction],
      };

      const card = next.hand.splice(handIdx, 1)[0];
      next.inPlayAction.push(card);
      next.actions = prev.actions - 1;

      applyEffects(next, card.effects);
      return next;
    });
  }

  function playTreasure(cardId: string) {
    setState(prev => {
      if(prev.phase !== 'action' && prev.phase !== 'buy') return prev;

      const handIdx = prev.hand.findIndex(c => c.id === cardId);
      if(handIdx === -1) return prev;
      const card = prev.hand[handIdx];

      // Treasureカードでなければ無視
      if(!card.types.includes('Treasure')) return prev;

      const next = { ...prev };
      next.hand = [...prev.hand];
      next.inPlayTreasure = [...prev.inPlayTreasure];

      next.hand.splice(handIdx, 1);
      next.inPlayTreasure.push(card);

      // コインを加算
      next.coins = prev.coins + (card.value ?? 0);

      // フェーズがactionならbuyに進める
      next.phase = 'buy';

      return next;
    }

    );
  }

  function buyCard(pile: 'basic' | 'kingdom', index: number) {
    setState(prev => {
      // フェーズ、リソースチェック
      if (prev.phase !== 'buy') return prev;
      if(prev.buys <= 0) return prev;

      const pileArr = prev.supply[pile];
      if(index < 0 || index >= pileArr.length) return prev;

      const targetPile = pileArr[index];
      if(targetPile.count <= 0) return prev;

      const card = targetPile.card;
      if(prev.coins < card.cost) return prev;

      // 購入処理
      const next = { ...prev };
      next.supply = {
        ...prev.supply,
        [pile]: [...pileArr],
      };

      // サプライ残数を1減らす
      next.supply[pile][index] = { ...targetPile, count: targetPile.count - 1};

      // コインと購入回数を消費
      next.coins = prev.coins - card.cost;
      next.buys = prev.buys - 1;

      // 購入したカードを捨て札へ
      next.discard = [...prev.discard, card];

      return next;

    });
  }

  function playAllTreasures() {
    setState(prev => {
      if(prev.phase !== 'action' && prev.phase !== 'buy') return prev;

      const treasures = prev.hand.filter(c => c.types.includes('Treasure'));
      if(treasures.length === 0) return prev;

      const next = { ...prev };
      next.hand = prev.hand.filter(c => !c.types.includes('Treasure'));
      next.inPlayTreasure = [...prev.inPlayTreasure, ...treasures];
      next.coins = prev.coins + treasures.reduce((sum, c) => sum + (c.value ?? 0), 0);
      next.phase = 'buy';
      return next;
    });
  }

  return { state, drawCards, startTurn, endTurn, playAction, playTreasure, playAllTreasures, buyCard };
}
