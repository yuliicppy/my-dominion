import { Card } from './types';
import { requireCard } from './utils';

/**
 * 山札/サプライの山（カードと残数）
 */
export type SupplyPile = {
  card: Card;
  count: number;
};

/**
 * 与えられたカードプールから、
 * - 基本サプライ（銅貨・銀貨・金貨）
 * - ランダムに選んだ10枚の王国サプライ
 * を作成して返す（単純実装）。
 */
export function createSupply(cardPool: Card[]): { basic: SupplyPile[]; kingdom: SupplyPile[] } {
  const basic: SupplyPile[] = [
    { card: requireCard(cardPool, 'copper'), count: 60 },
    { card: requireCard(cardPool, 'silver'), count: 40 },
    { card: requireCard(cardPool, 'gold'), count: 30 },
    { card: requireCard(cardPool, 'estate'), count: 24 },
    { card: requireCard(cardPool, 'duchy'), count: 12 },
    { card: requireCard(cardPool, 'province'), count: 12 },
    { card: requireCard(cardPool, 'curse'), count: 30 },
  ];

  // 王国カードの候補（財宝・勝利は除外）
  const kingdomCandidates = cardPool.filter(c => !c.isBasicSupply);

  // ランダムに10枚選ぶ（候補が少ない場合は重複無しで可能な限り選択）
  const shuffled = [...kingdomCandidates];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const kingdomSelection: SupplyPile[] = [];
  for (let i = 0; i < 10; i++) {
    const card = shuffled[i % shuffled.length];
    if (!card) break;
    kingdomSelection.push({ card, count: 10 }); // 簡易に各山を10枚に
  }

  return { basic, kingdom: kingdomSelection };
}
