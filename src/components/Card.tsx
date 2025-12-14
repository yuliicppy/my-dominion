// カード表示コンポーネント

import React from 'react';
import { Card as CardType } from '../game/types';

function pickColor(types?: string[]) {
  if (!types || types.length === 0) return { bg: '#f7f7f7', color: '#111' };
  if (types.includes('Treasure')) return { bg: '#f5e09e', color: '#2b2b2b' }; // 金色っぽく
  if (types.includes('Victory')) return { bg: '#d4edda', color: '#145214' }; // 緑
  if (types.includes('Action')) return { bg: '#dbe7ff', color: '#08306b' }; // 青
  if (types.includes('Attack')) return { bg: '#ffd8d8', color: '#6b0b0b' }; // 赤系
  if (types.includes('Reaction')) return { bg: '#f0d9ff', color: '#3a0b4a' }; // 紫系
  if (types.includes('Curse')) return { bg: '#bdbdbd', color: '#111' }; // 灰色
  return { bg: '#fff', color: '#111' };
}

export default function Card({ card, size = 'normal' }: { card: CardType; size?: 'normal' | 'small' }) {
  const isSmall = size === 'small';
  const { bg, color } = pickColor(Array.isArray(card.types) ? card.types : undefined);

  const width = isSmall ? 110 : 150;
  const height = isSmall ? 150 : 200;

  const containerStyle: React.CSSProperties = {
    width,
    height,
    borderRadius: 8,
    padding: 10,
    boxSizing: 'border-box',
    background: bg,
    color,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    border: '1px solid rgba(0,0,0,0.06)',
    boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
    overflow: 'hidden',
  };

  const typeText = Array.isArray(card.types) ? card.types.join(', ') : (card as any).type ?? '';
  const desc = card.description ?? (card as any).text ?? '';

  return (
    <div style={containerStyle}>
      <div>
        <div style={{ fontWeight: 800, fontSize: isSmall ? 14 : 16, lineHeight: 1.1 }}>{card.name}</div>
        <div style={{ fontSize: isSmall ? 11 : 12, color: 'rgba(0,0,0,0.6)', marginTop: 6 }}>{typeText} ・ コスト: {card.cost}</div>
      </div>
      {desc ? <div style={{ fontSize: isSmall ? 11 : 12, color: 'rgba(0,0,0,0.65)' }}>{desc}</div> : null}
    </div>
  );
}