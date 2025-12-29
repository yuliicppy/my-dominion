// カード表示コンポーネント

import React, { useEffect, useRef, useState } from 'react';
import { Card as CardType } from '../game/types';
import './Card.css';

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
  const previewTimer = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewPos, setPreviewPos] = useState<{ x: number; y: number }>({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const isSmall = size === 'small';
  const { bg, color } = pickColor(Array.isArray(card.types) ? card.types : undefined);

  const typeText = Array.isArray(card.types) ? card.types.join(', ') : (card as any).type ?? '';
  const desc = card.description ?? (card as any).text ?? '';
  const containerClass = `card-container ${isSmall ? 'small' : 'normal'}`;
  const nameLength = card.name.length;
  const nameSize = isSmall ? (nameLength > 16 ? 10 : nameLength > 12 ? 11 : 12) : (nameLength > 20 ? 12 : nameLength > 14 ? 13 : 14);
  const typeLength = typeText.length;
  const typeSize = isSmall
    ? (typeLength > 16 ? 9 : typeLength > 12 ? 10 : 11)
    : (typeLength > 20 ? 10 : typeLength > 14 ? 11 : 12);

  const handleEnter = () => {
    const el = containerRef.current;
    const area = el?.closest('.hand-panel') || el?.closest('.supply-section');
    if (area) {
      const rect = area.getBoundingClientRect();
      setPreviewPos({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    } else {
      setPreviewPos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }
    previewTimer.current = window.setTimeout(() => setShowPreview(true), 250);
  };

  const handleLeave = () => {
    if (previewTimer.current) {
      window.clearTimeout(previewTimer.current);
      previewTimer.current = null;
    }
    setShowPreview(false);
  };

  useEffect(() => {
    return () => {
      if (previewTimer.current) {
        window.clearTimeout(previewTimer.current);
      }
    };
  }, []);

  return (
    <div
      className={containerClass}
      style={{ background: bg, color }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      ref={containerRef}
    >
      <div className="card-header">
        <div className="card-name" style={{ fontSize: nameSize }}>{card.name}</div>
      </div>
      <div className="card-cost-badge">{card.cost}</div>
      <div className="card-meta" style={{ fontSize: typeSize }}>
        {typeText}
      </div>
      <div
        className={`card-preview ${showPreview ? 'visible' : ''}`}
        aria-hidden={!showPreview}
        style={{ background: bg, color, left: previewPos.x, top: previewPos.y }}
      >
        <div className="card-preview-name">{card.name}</div>
        <div className="card-preview-meta">{typeText} ・ コスト: {card.cost}</div>
        <div className="card-preview-desc">{desc || '説明なし'}</div>
      </div>
    </div>
  );
}
