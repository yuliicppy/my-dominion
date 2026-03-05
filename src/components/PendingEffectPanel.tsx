import React from 'react';
import { GameState, PendingEffect } from '../game/types';
import { DiscardForDrawPanel, TrashFromHandPanel, TopdeckFromDiscardPanel } from './pending';

type Props = {
  state: GameState;
  onResolveDiscardForDraw: (indices: number[]) => void;
  onResolveTrashFromHand: (indices: number[]) => void;
  onResolveTopdeckFromDiscard: (payload: { indices: number[] }) => void;
};

type PanelRenderer = (props: Props) => React.ReactElement | null;

const panelRegistry: Record<PendingEffect['kind'], PanelRenderer> = {
  DiscardForDraw: ({ state, onResolveDiscardForDraw }) => (
    <DiscardForDrawPanel hand={state.hand} onResolve={onResolveDiscardForDraw} />
  ),
  TrashFromHand: ({ state, onResolveTrashFromHand }) => {
    if (!state.pendingEffect || state.pendingEffect.kind !== 'TrashFromHand') return null;
    return (
      <TrashFromHandPanel
        hand={state.hand}
        max={state.pendingEffect.max}
        onResolve={onResolveTrashFromHand}
      />
    );
  },
  GainCard: () => null,
  TopdeckFromDiscard: ({ state, onResolveTopdeckFromDiscard }) => {
    if (!state.pendingEffect || state.pendingEffect.kind !== 'TopdeckFromDiscard') return null;
    return (
      <TopdeckFromDiscardPanel
        discard={state.discard}
        max={state.pendingEffect.max}
        optional={state.pendingEffect.optional}
        onResolve={onResolveTopdeckFromDiscard}
      />
    );
  },
};

export default function PendingEffectPanel(props: Props) {
  const { state } = props;
  if (!state.pendingEffect) return null;

  const renderer = panelRegistry[state.pendingEffect.kind];
  if (!renderer) return null;
  return renderer(props);
}
