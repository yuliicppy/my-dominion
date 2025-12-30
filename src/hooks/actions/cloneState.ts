import { GameState } from '../../game/types';

// GameState のイミュータブル更新用に浅いコピーをまとめる
export function cloneState(prev: GameState): GameState {
  return {
    ...prev,
    deck: [...prev.deck],
    hand: [...prev.hand],
    discard: [...prev.discard],
    trash: [...prev.trash],
    inPlayTreasure: [...prev.inPlayTreasure],
    inPlayAction: [...prev.inPlayAction],
    supply: {
      basic: prev.supply.basic.map(p => ({ ...p })),
      kingdom: prev.supply.kingdom.map(p => ({ ...p })),
    },
    pendingEffect: prev.pendingEffect ? { ...prev.pendingEffect } as any : null,
  };
}
