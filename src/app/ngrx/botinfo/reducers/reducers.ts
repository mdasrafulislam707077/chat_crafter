import { createReducer, on } from '@ngrx/store';
import { addBotName, removeBotname } from '../actions/actions';
import initialState from '../state/bot.reducer';
import { BotInfo } from '../../../model/botInfoModel';
export const botReducer = createReducer(
  initialState,
  on(addBotName, (state, { botinfo }) => ({
    ...state, 
    botname: botinfo.botname, 
  })),
  on(removeBotname, (state) => ({
    ...state, 
    botname: null, 
  }))
);