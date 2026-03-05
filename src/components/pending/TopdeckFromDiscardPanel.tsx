import React, { useEffect, useState } from 'react';
import { GameState } from '../../game/types';

type Props = {
  discard: GameState['discard'];
  max: number;
  optional: boolean;
  onResolve: (payload: { indices: number[] }) => void;
};

export default function TopdeckFromDiscardPanel({
  discard,
  max,
  optional,
  onResolve,
}: Props) {
  const [selection, setSelection] = useState<number[]>([]);

  useEffect(() => {
    setSelection([]);
  }, [discard.length, max]);

  const toggle = (idx: number) => {
    setSelection(prev => {
      if (prev.includes(idx)) return prev.filter(i => i !== idx);
      // 上限を超える選択は受け付けない
      if (prev.length >= max) return prev;
      return [...prev, idx];
    });
  };

  const canConfirm = optional ? selection.length <= max : selection.length > 0 && selection.length <= max;

  return (
    <div className="pending-panel">
      <div className="cellar-actions">
        <span>前駆者: 捨て札から山札の上に置くカードを選んでください（最大{max}枚）</span>
        {optional && (
          <button className="action-btn" onClick={() => onResolve({ indices: [] })}>
            置かない
          </button>
        )}
        <button
          className="action-btn"
          disabled={!canConfirm}
          onClick={() => onResolve({ indices: selection })}
        >
          選択カードを山札の上に置く
        </button>
      </div>

      <div className="cellar-hand-list">
        {discard.length === 0 && <div className="empty-text">捨て札がありません</div>}
        {discard.map((card, i) => {
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
