// カードゲームのメインボードコンポーネント

import React from 'react';
import { useGame } from '../hooks/useGame';
import Card from './Card';

export default function GameBoard() {
  const { state, drawCards, startTurn, endTurn, playAction } = useGame();

  return (
    <div style={{ padding: 16 }}>
      <h2>ゼロから作るDominion (single-player)</h2>
      <div style={{ marginBottom: 8 }}>
        <button onClick={() => startTurn()}>Start Turn</button>{' '}
        <button onClick={() => playAction()}>Play Action</button>{' '}
        <button onClick={() => drawCards(1)}>Draw 1</button>{' '}
        <button onClick={() => endTurn()}>End Turn</button>
      </div>

      <div>Turn: {state.turn} | Phase: {state.phase}</div>
      <div>Actions: {state.actions} | Buys: {state.buys} | Coins: {state.coins}</div>
      <div>Deck: {state.deck.length} | Discard: {state.discard.length} | Hand: {state.hand.length}</div>

      <h3>Hand</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {state.hand.map((c, i) => (
          <Card key={c.id + '-' + i} card={c} size="normal" />
        ))}
        {state.hand.length === 0 && <div style={{ color: '#666' }}>No cards in hand</div>}
      </div>

      {/* デバッグ用: 山札を画面本体とは別に表示 */}
      <aside style={{ marginTop: 24, padding: 12, borderTop: '1px solid #ddd' }}>
        <h3>デバッグ — 山札 (Deck)</h3>
        <div style={{ marginBottom: 8, color: '#444' }}>枚数: {state.deck.length}</div>

        {/* 山札を上から順に小さめの Card コンポーネントで表示 */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {state.deck.length === 0 && <div style={{ color: '#666' }}>山札が空です</div>}
          {state.deck.map((c, i) => (
            <div key={c.id + '-' + i} title={`#${i + 1} ${c.name}`}>
              <Card card={c} size="small" />
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}