import React from 'react';
import { GameState, PendingEffect } from '../game/types';
import { DiscardForDrawPanel, TrashFromHandPanel } from './pending';

type Props = {
  state: GameState;
  onResolveDiscardForDraw: (indices: number[]) => void;
  onResolveTrashFromHand: (indices: number[]) => void;
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
};

export default function PendingEffectPanel(props: Props) {
  const { state } = props;
  if (!state.pendingEffect) return null;

  const renderer = panelRegistry[state.pendingEffect.kind];
  if (!renderer) return null;
  return renderer(props);
}
