// カード表示コンポーネント

import React from 'react';
import { Card as CardType } from '../game/types';

export default function Card({ card, size = 'normal' }: { card: CardType; size?: 'normal' | 'small' }) {
  const isSmall = size === 'small';
  const containerStyle: React.CSSProperties = {
    border: '1px solid #ccc',
    padding: isSmall ? 6 : 10,
    margin: isSmall ? 4 : 6,
    width: isSmall ? 110 : 150,
    fontSize: isSmall ? 12 : 14,
    background: isSmall ? '#ffffff' : '#f7f8fa', // コントラストを出すため常に背景色を指定
    color: '#222',
    borderRadius: 6,
    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
    display: 'flex',
    flexDirection: 'column',
  };

  const typeText = Array.isArray(card.types) ? card.types.join(', ') : (card as any).type ?? '';
  const desc = card.description ?? (card as any).text ?? '';

  return (
    <div style={containerStyle}>
      <div style={{ fontWeight: 700, fontSize: isSmall ? 13 : 16, color: '#111' }}>{card.name}</div>
      <div style={{ fontSize: isSmall ? 11 : 12, color: '#666', marginTop: 4 }}>{typeText} ・ コスト: {card.cost}</div>
      {desc && <div style={{ marginTop: 8, fontSize: isSmall ? 11 : 13, color: '#333' }}>{desc}</div>}
    </div>
  );
}