// カードデータ
import { Card } from './types';

export const sampleCards: Card[] = [
  { id: 'copper', name: '銅貨', types: ['Treasure'], cost: 0, description: 'コイン+1', effects: [{ kind: 'AddCoins', amount: 1 }]},
  { id: 'estate', name: '屋敷', types: ['Victory'], cost: 2, description: '勝利点1', effects: []},
  { id: 'smithy', name: '鍛冶屋', types: ['Action'], cost: 4, description: '+3 カードを引く', effects: [{ kind: 'DrawCards', amount: 3 }]},
];