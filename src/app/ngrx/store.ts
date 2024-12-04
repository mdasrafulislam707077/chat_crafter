import { ActionReducerMap, provideStore } from '@ngrx/store';
import { botReducer } from './botinfo/reducers/reducers';
import { BotInfo } from '../model/botInfoModel';
export interface AppState {
  botinfo: BotInfo;
}

export const reducers: ActionReducerMap<AppState> = {
  botinfo: botReducer,
};

export function provideServerRendering() {
  return [provideStore(reducers)];
}
