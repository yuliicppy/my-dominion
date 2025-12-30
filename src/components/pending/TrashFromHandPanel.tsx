import React, { useEffect, useState } from 'react';
import { GameState } from '../../game/types';

type Props = {
  hand: GameState['hand'];
  max: number;
  onResolve: (indices: number[]) => void;
};

export default function TrashFromHandPanel({ hand, max, onResolve }: Props) {
  const [selection, setSelection] = useState<number[]>([]);

  useEffect(() => {
    setSelection([]);
  }, [hand.length]);

  const toggle = (idx: number) => {
    setSelection(prev => {
      if (prev.includes(idx)) return prev.filter(i => i !== idx);
      if (prev.length >= max) return prev;
      return [...prev, idx];
    });
  };

  return (
    <div className="pending-panel">
      <div className="cellar-actions">
        <span>礼拝堂: 廃棄するカードを選んでください（最大{max}枚・現在{selection.length}枚）</span>
        <button className="action-btn" onClick={() => onResolve(selection)}>
          選択を廃棄する
        </button>
      </div>
      <div className="cellar-hand-list">
        {hand.length === 0 && <div className="empty-text">手札がありません</div>}
        {hand.map((card, i) => {
          const checked = selection.includes(i);
          return (
            <label key={card.id + '-' + i} className="cellar-select-row">
              <input type="checkbox" checked={checked} onChange={() => toggle(i)} />
              <span className="cellar-card-name">{card.name}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
