import { GameState, EffectDef, PendingEffect } from '../../types';
import { discardForDrawPending } from './DiscardForDraw';
import { trashFromHandPending } from './TrashFromHand';
import { gainCardPending } from './GainCard';

type PendingPayloadByKind = {
  DiscardForDraw: number[];
  TrashFromHand: number[];
  GainCard: { pile: 'basic' | 'kingdom'; index: number };
};

type PendingEntry<K extends keyof PendingPayloadByKind> = {
  init: (s: GameState, e: EffectDef) => void;
  resolve: (s: GameState, payload: PendingPayloadByKind[K]) => void;
};

export const pendingRegistry: {
  [K in keyof PendingPayloadByKind]: PendingEntry<K>;
} = {
  DiscardForDraw: discardForDrawPending,
  TrashFromHand: trashFromHandPending,
  GainCard: gainCardPending,
};
