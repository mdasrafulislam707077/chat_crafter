import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addBotName } from '../../ngrx/botinfo/actions/actions';
import { AppState } from '../../ngrx/store';
import { BotStatusService } from '../../services/network/bot-status.service';
@Component({
  selector: 'app-header-option',
  imports: [NgOptimizedImage, CommonModule, FormsModule],
  templateUrl: './header-option.component.html',
  styleUrl: './header-option.component.scss',
})
export class HeaderOptionComponent implements OnInit {
  activeProfile: boolean = false;
  bot_name: string = '';
  active_bot!: any | null;
  list_items: any[] = [];
  constructor(
    private botStatusService: BotStatusService,
    private store: Store<AppState>
  ) {}
  clickProfile(): void {
    this.activeProfile = !this.activeProfile;
  }
  closeToClick(): void {
    this.botStatusService
      .onChangeBotDev({
        status: 'CLOSE',
      })
      ?.subscribe(
        (res: any) => {
          this.active_bot = null;
          this.activeProfile = false;
          this.store.dispatch(addBotName({ botinfo: { botname: null } }));
        },
        (error: any) => {}
      );
  }
  clickBotProfile(info: any): void {
    this.botStatusService
      .onChangeBotDev({
        name: info.name,
        status: 'CHANGE',
      })
      ?.subscribe(
        (res: any) => {
          this.active_bot = res?.botname;

          this.store.dispatch(
            addBotName({ botinfo: { botname: this.active_bot.name } })
          );
        },
        (error: any) => {}
      );
  }
  ngOnInit(): void {
    this.botStatusService.onChangeBotDev({})?.subscribe(
      (res: any) => {
        if (!res?.botname) {
          this.botStatusService.getBotList()?.subscribe(
            (res: any) => {
              this.list_items = res?.items;
            },
            (error: any) => {}
          );
        } else {
          this.active_bot = res?.botname;
          this.store.dispatch(
            addBotName({ botinfo: { botname: this.active_bot.name } })
          );
        }
      },
      (error: any) => {}
    );
  }
  deleteBot(name: string): void {
    this.botStatusService.deleteBotItem(name)?.subscribe(
      (res) => {
        this.list_items = res?.items;
      },
      (res) => {}
    );
  }
  create_bot(): void {
    this.botStatusService.createBotName({ name: this.bot_name })?.subscribe(
      (res: any) => {
        this.list_items = res?.listOfBot;
        this.bot_name = '';
      },
      (error: any) => {}
    );
  }
}
