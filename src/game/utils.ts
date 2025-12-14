import { Card } from './types';

/**
 * cardPool から id に該当する Card を返す。見つからなければ例外を投げる。
 * 他モジュールで共用するユーティリティ関数。
 */
export function requireCard(cardPool: Card[], id: string): Card {
  const card = cardPool.find(c => c.id === id);
  if (!card) {
    throw new Error(`Card not found: ${id}`);
  }
  return card;
}