// ゲーム状態を管理するカスタムフック

import { useState } from 'react';
import { GameState } from '../game/types';
import { createInitialState } from '../game/engine';
import { cloneState } from './actions/cloneState';
import { drawCards as drawCardsAction } from './actions/drawCards';
import { startTurn as startTurnAction } from './actions/startTurn';
import { endTurn as endTurnAction } from './actions/endTurn';
import { playAction as playActionAction } from './actions/playAction';
import { playTreasure as playTreasureAction } from './actions/playTreasure';
import { playAllTreasures as playAllTreasuresAction } from './actions/playAllTreasures';
import { buyCard as buyCardAction } from './actions/buyCard';
import { resolveDiscardForDraw as resolveDiscardForDrawAction } from './actions/resolveDiscardForDraw';
import { resolveTrashFromHand as resolveTrashFromHandAction } from './actions/resolveTrashFromHand';
import { debugAddCardToHand as debugAddCardToHandAction } from './actions/debugAddCardToHand';

export function useGame() {
  const [state, setState] = useState<GameState>(() => createInitialState());

  function update(mutator: (next: GameState) => void) {
    setState(prev => {
      const next = cloneState(prev);
      mutator(next);
      return next;
    });
  }

  const drawCards = (n = 1) => update(state => drawCardsAction(state, n));
  const startTurn = () => update(state => startTurnAction(state));
  const endTurn = () => update(state => endTurnAction(state));
  const playAction = (cardId: string) => update(state => playActionAction(state, cardId));
  const playTreasure = (cardId: string) => update(state => playTreasureAction(state, cardId));
  const playAllTreasures = () => update(state => playAllTreasuresAction(state));
  const buyCard = (pile: 'basic' | 'kingdom', index: number) => update(state => buyCardAction(state, pile, index));
  const resolveDiscardForDraw = (indices: number[]) => update(state => resolveDiscardForDrawAction(state, indices));
  const resolveTrashFromHand = (indices: number[]) => update(state => resolveTrashFromHandAction(state, indices));
  const debugAddCardToHand = (cardId: string) => update(state => debugAddCardToHandAction(state, cardId));

  return { state, drawCards, startTurn, endTurn, playAction, playTreasure, playAllTreasures, buyCard, resolveDiscardForDraw, resolveTrashFromHand, debugAddCardToHand};
}
