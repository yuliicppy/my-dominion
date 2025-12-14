// カードゲームのメインボードコンポーネント

import React from 'react';
import { useGame } from '../hooks/useGame';
import Card from './Card';
import { createSupply } from '../game/supply';
import { cardMaster } from '../game/cardData';

export default function GameBoard() {
  const { state, drawCards, startTurn, endTurn, playAction } = useGame();

  const [supply, setSupply] = React.useState(() => createSupply(cardMaster));
  const regenerate = () => setSupply(createSupply(cardMaster));

  return (
    <div style={{ padding: 16 }}>
      <h2>ゼロから作るDominion (single-player)</h2>
      <div style={{ marginBottom: 8 }}>
        <button onClick={() => startTurn()}>Start Turn</button>{' '}
        <button onClick={() => playAction()}>Play Action</button>{' '}
        <button onClick={() => drawCards(1)}>Draw 1</button>{' '}
        <button onClick={() => endTurn()}>End Turn</button>{' '}
        <button onClick={regenerate}>サプライを再生成</button>
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

      {/* サプライ表示（メイン画面とは別） */}
      <section style={{ marginTop: 24, padding: 12, borderTop: '2px solid #ddd' }}>
        <h3>サプライ</h3>

        <div style={{ marginTop: 8 }}>
          <h4>基本サプライ</h4>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {supply.basic && supply.basic.length > 0 ? (
              supply.basic.map((p, i) => (
                p && p.card ? (
                  <div key={p.card.id + '-' + i} style={{ textAlign: 'center' }}>
                    <Card card={p.card} size="small" />
                    <div style={{ fontSize: 12, color: '#333', marginTop: 6 }}>残り: {p.count}</div>
                  </div>
                ) : (
                  <div key={`missing-basic-${i}`} style={{ textAlign: 'center', color: '#a00' }}>
                    <div style={{ border: '1px dashed #bbb', padding: 8, borderRadius: 6 }}>不明なカード</div>
                  </div>
                )
              ))
            ) : (
              <div style={{ color: '#666' }}>基本サプライが設定されていません</div>
            )}
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <h4>王国カード（ランダム10種）</h4>

          {/* 2行 x 5列 のグリッド */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gridAutoRows: '1fr',
              gap: 12,
              alignItems: 'start',
              marginTop: 8,
            }}
          >
            {Array.from({ length: 10 }).map((_, idx) => {
              const pile = supply.kingdom[idx];
              if (!pile || !pile.card) {
                return (
                  <div key={`empty-${idx}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: 110, height: 150, borderRadius: 8, border: '1px dashed #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                      未選択
                    </div>
                  </div>
                );
              }
              return (
                <div key={pile.card.id + '-' + idx} style={{ textAlign: 'center' }} title={`山札 #${idx + 1}`}>
                  <Card card={pile.card} size="small" />
                  <div style={{ fontSize: 12, color: '#333', marginTop: 6 }}>残り: {pile.count}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* デバッグ用: 山札を画面本体とは別に表示 */}
      <aside style={{ marginTop: 24, padding: 12, borderTop: '1px solid #ddd' }}>
        <h3>デバッグ — 山札 (Deck)</h3>
        <div style={{ marginBottom: 8, color: '#444' }}>枚数: {state.deck.length}</div>
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