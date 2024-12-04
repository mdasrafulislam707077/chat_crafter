import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { CheckOptionComponent } from '../../../components/check-option/check-option.component';
import { ListItemComponent } from '../../../components/list-item/list-item.component';
import { selectBotInfo } from '../../../ngrx/botinfo/selectors/botinfo';
import { AppState } from '../../../ngrx/store';
import { IntentsService } from '../../../services/network/intents.service';
@Component({
  selector: 'app-intentdetails',
  imports: [CheckOptionComponent, CommonModule, ListItemComponent],
  templateUrl: './intentdetails.component.html',
  styleUrl: './intentdetails.component.scss',
})
export class IntentdetailsComponent implements OnInit {
  multilineToSingleLine: boolean = true;
  intents: string = '';
  listOfIntents: any[] = [];
  id: string;
  botInfo: any;
  constructor(
    private intentsService: IntentsService,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.id = this.route?.snapshot?.params['id'];
  }
  ngOnInit(): void {
    this.store.pipe(select(selectBotInfo)).subscribe((botInfo: any) => {
      this.botInfo = botInfo;
      if (this.botInfo) {
        this.intentsService
          .fetchIntensInfo(this.id, this.botInfo?.botname)
          ?.subscribe(
            (res: any) => {
              this.listOfIntents = res?.item?.items;
            },
            (error: any) => {}
          );
      }
    });
  }
  changeTab(): void {
    this.multilineToSingleLine = !this.multilineToSingleLine;
  }

  textChange(e: any): void {
    this.intents = e?.target?.value;
  }
  addIntentsObj(event?: any): void {
    if (event == null) {
      this.listOfIntents = [{ txt: this.intents }, ...this.listOfIntents];
      this.intentsService
        .injectIntents({ txt: this.intents, id: this.id,botname: this.botInfo?.botname })
        ?.subscribe(
          (res: any) => {
            this.intents = '';
          },
          (error: any) => {}
        );
      return;
    }
    if (event.key === 'Enter' && !this.multilineToSingleLine) {
      this.listOfIntents = [{ txt: this.intents }, ...this.listOfIntents];
      this.intentsService
        .injectIntents({ txt: this.intents, id: this.id })
        ?.subscribe(
          (res: any) => {
            this.intents = '';
          },
          (error: any) => {}
        );
    }
  }
  blankinput(): void {
    this.intents = '';
  }
}
