import { createAction, props } from '@ngrx/store';
import { BotInfo } from '../../../model/botInfoModel';

export const addBotName = createAction(
  'add-bot-name',
  props<{ botinfo: BotInfo }>()
);
export const removeBotname = createAction('removename');
