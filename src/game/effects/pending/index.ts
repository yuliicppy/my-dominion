import { GameState, EffectDef, PendingEffect } from '../../types';
import { discardForDrawPending } from './DiscardForDraw';
import { trashFromHandPending } from './TrashFromHand';

type PendingEntry = {
  init: (s: GameState, e: EffectDef) => void;
  resolve: (s: GameState, indices: number[]) => void;
};

export const pendingRegistry: Record<PendingEffect['kind'], PendingEntry> = {
  DiscardForDraw: discardForDrawPending,
  TrashFromHand: trashFromHandPending,
};