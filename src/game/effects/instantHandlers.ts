import { GameState, EffectDef } from '../types';
import { draw } from '../engine';

type InstantHandler = (state: GameState, effect: EffectDef) => void;

const InstantHandlers: Record<EffectDef['kind'], InstantHandler | undefined> = {
  DrawCards: (s, e) => draw(s, (e as Extract<EffectDef, {kind: 'DrawCards'}>).amount),
  AddActions: (s, e) => { s.actions += (e as Extract<EffectDef,{kind:'AddActions'}>).amount; },
  AddBuys:   (s, e) => { s.buys   += (e as Extract<EffectDef,{kind:'AddBuys'}>).amount; },
  AddCoins:  (s, e) => { s.coins  += (e as Extract<EffectDef,{kind:'AddCoins'}>).amount; },
  DiscardForDraw: undefined,
  TrashFromHand: undefined,
  If: undefined,
  Repeat: undefined,
  GainCard: undefined,
  TrashCard: undefined,
};

export function applyInstantEffect(state: GameState, effect: EffectDef) {
  const handler = InstantHandlers[effect.kind];
  if(handler) handler(state, effect);
}