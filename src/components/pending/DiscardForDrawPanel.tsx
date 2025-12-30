import React, { useEffect, useState } from 'react';
import { GameState } from '../../game/types';

type Props = {
  hand: GameState['hand'];
  onResolve: (indices: number[]) => void;
};

export default function DiscardForDrawPanel({ hand, onResolve }: Props) {
  const [selection, setSelection] = useState<number[]>([]);

  useEffect(() => {
    setSelection([]);
  }, [hand.length]);

  const toggle = (idx: number) => {
    setSelection(prev => (prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]));
  };

  return (
    <div className="pending-panel">
      <div className="cellar-actions">
        <span>地下貯蔵庫: 捨てるカードを選んでください（{selection.length}枚）</span>
        <button className="action-btn" onClick={() => onResolve(selection)}>
          選択枚数を捨てて同数ドロー
        </button>
      </div>
      <div className="cellar-hand-list">
        {hand.length === 0 && <div className="empty-text">手札がありません</div>}
        {hand.map((card, i) => {
          const checked = selection.includes(i);
          return (
            <label key={card.id + '-' + i} className="cellar-select-row">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(i)}
              />
              <span className="cellar-card-name">{card.name}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
