import React, { useEffect, useState } from 'react';
import { GameState } from '../game/types';

type Props = {
  state: GameState;
  onResolveDiscardForDraw: (indices: number[]) => void;
  onResolveTrashFromHand: (indices: number[]) => void;
};

export default function PendingEffectPanel({ state, onResolveDiscardForDraw, onResolveTrashFromHand }: Props) {
  const { pendingEffect, hand } = state;

  if (!pendingEffect) return null;

  switch (pendingEffect.kind) {
    case 'DiscardForDraw':
      return (
        <CellarPanel handSize={hand.length} handNames={hand.map(c => c.name)} onResolve={onResolveDiscardForDraw} />
      );
    case 'TrashFromHand':
      return (
        <ChapelPanel max={pendingEffect.max} handSize={hand.length}
          handNames={hand.map(c => c.name)}
          onResolve={onResolveTrashFromHand}
          ></ChapelPanel>
      );
    default:
      return null;
  }
}

function CellarPanel({
  handSize,
  handNames,
  onResolve,
}: {
  handSize: number;
  handNames: string[];
  onResolve: (indices: number[]) => void;
}) {
  const [selection, setSelection] = useState<number[]>([]);

  useEffect(() => {
    setSelection([]);
  }, [handSize]);

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
        {handSize === 0 && <div className="empty-text">手札がありません</div>}
        {handNames.map((name, i) => {
          const checked = selection.includes(i);
          return (
            <label key={name + '-' + i} className="cellar-select-row">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(i)}
              />
              <span className="cellar-card-name">{name}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function ChapelPanel({ max, handSize, handNames, onResolve }: {max: number; handSize: number; handNames: string[]; onResolve: (indices: number[]) => void; }){
  const [selection, setSelection] = useState<number[]>([]);
  useEffect(() => {setSelection([]);}, [handSize]);

  const toggle = (idx: number) => {
    setSelection(prev => {
      if(prev.includes(idx)) return prev.filter(i => i !== idx);
      if(prev.length >= max) return prev;
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
        {handSize === 0 && <div className="empty-text">手札がありません</div>}
        {handNames.map((name, i) => {
          const checked = selection.includes(i);
          return (
            <label key={name + '-' + i} className="cellar-select-row">
              <input type="checkbox" checked={checked} onChange={() => toggle(i)} />
              <span className="cellar-card-name">{name}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
