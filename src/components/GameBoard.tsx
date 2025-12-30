// カードゲームのメインボードコンポーネント

import React, { useState, useMemo } from 'react';
import { useGame } from '../hooks/useGame';
import { cardMaster } from '../game/cardData';
import PendingEffectPanel from './PendingEffectPanel';
import Card from './Card';
import './GameBoard.css';

export default function GameBoard() {
  const [showDebug, setShowDebug] = useState(false);
  const [debugQuery, setDebugQuery] = useState('');
  const filteredDebugCards = useMemo(() => {
    const q = debugQuery.trim();
    if(!q) return cardMaster;
    return cardMaster.filter(c => 
      c.name.includes(q) || c.id.toLowerCase().includes(q.toLowerCase())
    );
  }, [debugQuery]);
  const { state, drawCards, startTurn, endTurn, playAction, playTreasure, playAllTreasures, buyCard, resolveDiscardForDraw, resolveTrashFromHand, debugAddCardToHand } = useGame();

  const canPlayAllTreasures = state.hand.some(c => c.types.includes('Treasure')) && (state.phase === 'action' || state.phase === 'buy');

  return (
    <div className="gameboard-root">
      <header className="top-bar">
        <div className="title-block">
          <h2 className="gameboard-title">ゼロから作るDominion (single-player)</h2>
          <div className="status-grid">
            <div className="status-row">Turn: {state.turn} | Phase: {state.phase}</div>
            <div className="status-row">Actions: {state.actions} | Buys: {state.buys} | Coins: {state.coins}</div>
            <div className="status-row">Deck: {state.deck.length} | Discard: {state.discard.length} | Hand: {state.hand.length}</div>
          </div>
        </div>
        <div className="controls-row">
          <button onClick={() => endTurn()}>End Turn</button>
          <button onClick={() => setShowDebug(v => !v)}>
            {showDebug ? 'デバッグを隠す' : 'デバッグを表示'}
          </button>
        </div>
      </header>

      <div className={`main-grid ${showDebug ? 'show-debug' : ''}`}>
        <section className="hand-panel panel">
          <div className="panel-header">
            <h3>Hand</h3>
            <button className="action-btn" onClick={() => playAllTreasures()} disabled={!canPlayAllTreasures}>
              財宝を一括プレー
            </button>
          </div>
          <div className="hand-area">
            {state.hand.map((c, i) => {
              const isTreasure = c.types.includes('Treasure');
              const isAction = c.types.includes('Action');
              const canPlayTreasure = isTreasure && (state.phase === 'action' || state.phase === 'buy');
              const canPlayAction = isAction && state.phase === 'action' && state.actions > 0;
              return (
                <div key={c.id + '-' + i} className="hand-card">
                  <Card card={c} size="normal" />
                  {isTreasure && <button
                    className="action-btn"
                    onClick={() => playTreasure(c.id)}
                    disabled={!canPlayTreasure}
                  >
                    財宝をプレー
                  </button>}
                  {isAction && <button
                    className="action-btn"
                    onClick={() => playAction(c.id)}
                    disabled={!canPlayAction}
                  >
                    アクションをプレー
                  </button>}

                </div>
              );
            })}
            {state.hand.length === 0 && <div className="empty-text">No cards in hand</div>}
          </div>
          <PendingEffectPanel state={state} onResolveDiscardForDraw={resolveDiscardForDraw} onResolveTrashFromHand={resolveTrashFromHand} />
          <div className="played-area">
            <div className="panel-subheader">
              <h4>Played</h4>
              <span className="pill-count">{state.inPlayTreasure.length} 枚</span>
            </div>
            <div className="played-grid">
              {state.inPlayTreasure.map((c, i) => (
                <div key={c.id + '-played-' + i} className="played-card">
                  <Card card={c} size="small"></Card>
                </div>
              )
              )}
              {state.inPlayTreasure.length === 0 && (
                <div className="empty-text">まだプレーされたカードはありません</div>
              )}
            </div>
          </div>
        </section>

        {/* サプライ表示（メイン画面とは別） */}
        <section className="supply-section panel">
          <div className="panel-header">
            <h3>サプライ</h3>
          </div>

          <div className="supply-scroll">
            <div className="supply-block">
              <div className="supply-grid basic">
                {state.supply.basic.map((p, i) => {
                  const affordable = state.coins >= p.card.cost && state.buys > 0 && state.phase === 'buy' && p.count > 0;
                  return (
                    <div key={p.card.id + '-' + i} className="supply-pile">
                      <Card card={p.card} size="small" />
                      <div className="pile-cost">コスト: {p.card.cost}</div>
                      <div className="pile-count">残り: {p.count}</div>
                      <button className="action-btn" onClick={() => buyCard('basic', i)} disabled={!affordable}>
                        購入
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="supply-divider" aria-hidden="true" />

            <div className="supply-block">
              {/* 2行 x 5列 のグリッド */}
              <div className="supply-grid kingdom">
                {Array.from({ length: 10 }).map((_, idx) => {
                  const pile = state.supply.kingdom[idx];
                  if (!pile || !pile.card) {
                    return (
                      <div key={`empty-${idx}`} className="supply-pile empty">
                        未選択
                      </div>
                    );
                  }
                  const affordable = state.coins >= pile.card.cost && state.buys > 0 && state.phase === 'buy' && pile.count > 0;
                  return (
                    <div key={pile.card.id + '-' + idx} className="supply-pile" title={`山札 #${idx + 1}`}>
                      <Card card={pile.card} size="small" />
                      <div className="pile-cost">コスト: {pile.card.cost}</div>
                      <div className="pile-count">残り: {pile.count}</div>
                      <button className="action-btn" onClick={() => buyCard('kingdom', idx)} disabled={!affordable}>
                        購入
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* デバッグ用: サイドパネルとしてスライド表示 */}
        <aside className={`debug-section panel ${showDebug ? 'is-open' : ''}`} aria-hidden={!showDebug}>
          <div className="panel-header">
            <h3>デバッグ — 山札/カード追加</h3>
            <div className="deck-count">枚数: {state.deck.length}</div>
          </div>
          <div className="debug-search">
            <label className="debug-search-label">
              カード検索
              <input type="text" value={debugQuery} onChange={e => setDebugQuery(e.target.value)} placeholder="名前orIDで検索"></input>
            </label>
          </div>
          <div className="debug-card-list">
            {
              filteredDebugCards.map(card => (
                <button key={card.id} className="debug-card-row"
                onClick={() => debugAddCardToHand(card.id)}>
                  <span className="debug-card-name">{card.name}</span>
                  <span className="debug-card-meta">ID: {card.id}</span>
                </button>
              ))
            }
            {
              filteredDebugCards.length === 0 && (
                <div className="empty-text">該当カードがありません</div>
              )
            }
          </div>
          <div className="deck-grid">
            {state.deck.length === 0 && <div className="empty-text">山札が空です</div>}
            {state.deck.map((c, i) => (
              <div key={c.id + '-' + i} title={`#${i + 1} ${c.name}`}>
                <Card card={c} size="small" />
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
