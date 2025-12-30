// カードデータ
import { Card } from './types';

export const cardMaster: Card[] = [
  // 基本財宝（Base, 基本サプライ）
  { id: 'copper', name: '銅貨', types: ['Treasure'], cost: 0, value: 1, description: '+{coin:1}', effects: [], expansion: 'Base', isBasicSupply: true },
  { id: 'silver', name: '銀貨', types: ['Treasure'], cost: 3, value: 2, description: '+{coin:2}', effects: [], expansion: 'Base', isBasicSupply: true },
  { id: 'gold', name: '金貨', types: ['Treasure'], cost: 6, value: 3, description: '+{coin:3}', effects: [], expansion: 'Base', isBasicSupply: true },

  // 基本勝利点 / 呪い（Base, 基本サプライ）
  { id: 'estate', name: '屋敷', types: ['Victory'], cost: 2, description: '{victory:1}', effects: [], expansion: 'Base', isBasicSupply: true },
  { id: 'duchy', name: '公領', types: ['Victory'], cost: 5, description: '{victory:3}', effects: [], expansion: 'Base', isBasicSupply: true },
  { id: 'province', name: '属州', types: ['Victory'], cost: 8, description: '{victory:6}', effects: [], expansion: 'Base', isBasicSupply: true },
  { id: 'curse', name: '呪い', types: ['Curse'], cost: 0, description: '勝利点-1', effects: [], expansion: 'Base', isBasicSupply: true },

  // 王国カード(基本) — expansion は Base, isBasicSupply: false
  { id: 'cellar', name: '地下貯蔵庫', types: ['Action'], cost: 2, description: '+1アクション\n 手札から好きな枚数のカードを捨て札にし、その枚数分だけデッキからカードを引く。', effects: [
    { kind: "AddActions", amount: 1 },
    { kind: "DiscardForDraw" }
  ], expansion: 'Base', isBasicSupply: false },
  { id: 'moat', name: '堀', types: ['Action', 'Reaction'], cost: 2, description: 'カードを2枚引く（反応あり）', effects: [], expansion: 'Base', isBasicSupply: false },
  { id: 'chapel', name: '礼拝堂', types: ['Action'], cost: 2, description: 'カードを最大4枚廃棄できる', effects: [], expansion: 'Base', isBasicSupply: false },
  { id: 'vassal', name: '家臣', types: ['Action'], cost: 3, description: '+{coin:2}\n デッキの一番上のカードを1枚捨て札にする。それがアクションカードである場合、それを使用してもよい。', effects: [], expansion: 'Base', isBasicSupply: false },
  { id: 'harbinger', name: 'ハービンジャー', types: ['Action'], cost: 3, description: 'デッキを操作する', effects: [], expansion: 'Base', isBasicSupply: false },
  { id: 'merchant', name: '商人', types: ['Action'], cost: 3, description: 'カードを引いてコインを得る', effects: [], expansion: 'Base', isBasicSupply: false },
  { id: 'vassal', name: '従者', types: ['Action'], cost: 3, description: 'デッキをめくって処理', effects: [], expansion: 'Base', isBasicSupply: false },
  { id: 'village', name: '村', types: ['Action'], cost: 3, description: 'カードを1枚引き、アクション+2', effects: [], expansion: 'Base', isBasicSupply: false },
  { id: 'workshop', name: '工房', types: ['Action'], cost: 3, description: 'コストの低いカードを獲得', effects: [], expansion: 'Base', isBasicSupply: false },
  { id: 'bureaucrat', name: '役人', types: ['Action'], cost: 4, description: '勝利点カードを公開して相手に渡す', effects: [], expansion: 'Base', isBasicSupply: false },
  { id: 'gardens', name: '庭園', types: ['Victory'], cost: 4, description: 'ゲーム終了時に枚数で勝利点', effects: [], expansion: 'Base', isBasicSupply: false },
  { id: 'militia', name: '民兵', types: ['Action', 'Attack'], cost: 4, description: 'コイン+2、他プレイヤーは手札を2枚にする', effects: [], expansion: 'Base', isBasicSupply: false },
  { id: 'moneylender', name: '金貸し', types: ['Action'], cost: 4, description: '銅貨をトラッシュしてコイン獲得', effects: [], expansion: 'Base', isBasicSupply: false },
  { id: 'poacher', name: '密猟者', types: ['Action'], cost: 4, description: 'ドローと小さな罰則', effects: [], expansion: 'Base', isBasicSupply: false },
  { id: 'remodel', name: '改築', types: ['Action'], cost: 4, description: 'カードを廃棄してより高コストのカードを獲得', effects: [], expansion: 'Base', isBasicSupply: false },
  { id: 'smithy', name: '鍛冶屋', types: ['Action'], cost: 4, description: 'カードを3枚引く', effects: [{ kind: "DrawCards", amount: 3}], expansion: 'Base', isBasicSupply: false },
  { id: 'spy', name: 'スパイ', types: ['Action', 'Attack'], cost: 4, description: '自身と相手のトップカードを処理', effects: [], expansion: 'Base', isBasicSupply: false },
  { id: 'thief', name: '泥棒', types: ['Action', 'Attack'], cost: 4, description: 'デッキから財宝を盗む', effects: [], expansion: 'Base', isBasicSupply: false },
  { id: 'throne_room', name: '玉座の間', types: ['Action'], cost: 4, description: 'アクションカードを2回使う', effects: [], expansion: 'Base', isBasicSupply: false },
  { id: 'council_room', name: '評議会', types: ['Action'], cost: 5, description: 'カードを4枚引き、購入+1', effects: [], expansion: 'Base', isBasicSupply: false },
  { id: 'feast', name: '祝宴', types: ['Action'], cost: 4, description: 'カードを捨ててコストの高いカードを獲得', effects: [], expansion: 'Base', isBasicSupply: false },
  { id: 'laboratory', name: '研究室', types: ['Action'], cost: 5, description: 'カードを2枚引き、アクション+1', effects: [], expansion: 'Base', isBasicSupply: false },
  { id: 'witch', name: '魔女', types: ['Action', 'Attack'], cost: 5, description: 'カードを2枚引き、相手に呪いを与える', effects: [], expansion: 'Base', isBasicSupply: false },
  { id: 'adventurer', name: '冒険者', types: ['Action'], cost: 6, description: 'デッキをめくって財宝を獲得', effects: [], expansion: 'Base', isBasicSupply: false },
  { id: 'market', name: '市場', types: ['Action'], cost: 5, description: 'カード1・アクション1・購入1・コイン+1', effects: [], expansion: 'Base', isBasicSupply: false },
  { id: 'festival', name: '祝祭', types: ['Action'], cost: 5, description: 'アクション+2・購入+1・コイン+2', effects: [], expansion: 'Base', isBasicSupply: false },
];

export default cardMaster;
