import { GameState } from '../../game/types';
import { cardMaster } from '../../game/cardData';
import { requireCard } from '../../game/utils';

export function debugAddCardToHand(state: GameState, cardId: string) {
  const card = requireCard(cardMaster, cardId);
  state.hand.push(card);
}
