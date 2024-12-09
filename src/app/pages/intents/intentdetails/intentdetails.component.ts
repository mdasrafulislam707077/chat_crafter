import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { CheckOptionComponent } from '../../../components/check-option/check-option.component';
import { DialogBoxComponent } from '../../../components/dialog-box/dialog-box.component';
import { ListItemComponent } from '../../../components/list-item/list-item.component';
import { QusBoxComponent } from '../../../components/qus-box/qus-box.component';
import { selectBotInfo } from '../../../ngrx/botinfo/selectors/botinfo';
import { AppState } from '../../../ngrx/store';
import { IntentsService } from '../../../services/network/intents.service';
import { TextWordSelectorComponent } from "../../../components/text-word-selector/text-word-selector.component";
@Component({
  selector: 'app-intentdetails',
  imports: [
    CheckOptionComponent,
    CommonModule,
    ListItemComponent,
    QusBoxComponent,
    DialogBoxComponent,
    TextWordSelectorComponent
],
  templateUrl: './intentdetails.component.html',
  styleUrl: './intentdetails.component.scss',
})
export class IntentdetailsComponent implements OnInit {
  multilineToSingleLine: boolean = true;
  intents: string = '';
  listOfIntents: any[] = [];
  id: string;
  botInfo: any;
  storeName?: string | null;
  listinfo:any;
  alter_words:any[]  
  constructor(
    private intentsService: IntentsService,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.alter_words = []
    this.id = this.route?.snapshot?.params['id'];
  }
  deleteIntent(): void {
    if (this.botInfo?.botname) {
      this.intentsService
        ?.deleteIntents(this.botInfo?.botname, this.storeName ?? '', this.id)
        ?.subscribe(
          (res: any) => {
            this.listOfIntents = res?.item?.items;
            this.storeName = null;
          },
          (err: any) => {}
        );
    }
  }
  clickItem(i:any):void{
    this.listinfo = i
  }
  clickItemClose():void{
    this.listinfo = null
  }
  ngOnInit(): void {
    this.store.pipe(select(selectBotInfo)).subscribe((botInfo: any) => {
      this.botInfo = botInfo;
      if (this.botInfo) {
        this.intentsService
          .fetchIntensInfo(this.id, this.botInfo?.botname)
          ?.subscribe(
            (res: any) => {
              this.alter_words = res.item.alter_word
              this.listOfIntents = res?.item?.items;
            },
            (error: any) => {}
          );
      }
    });
  }
  storeeName(name: string): void {
    this.storeName = name;
  }
  clearStoreName(): void {
    this.storeName = null;
  }
  // deleteIntent(): void {}
  changeTab(): void {
    this.multilineToSingleLine = !this.multilineToSingleLine;
  }

  deleteListItem(info: any): void {
    console.log(info);
  }

  textChange(e: any): void {
    this.intents = e?.target?.value;
  }
  addIntentsObj(event?: any): void {
    const find = this.listOfIntents?.find(
      (element) => element.txt == this.intents
    );
    console.log(find);

    if (find) {
      this.intents = '';

      return;
    }
    if (event == null) {
      this.listOfIntents = [{ txt: this.intents }, ...this.listOfIntents];
      this.intentsService
        .injectIntents({
          txt: this.intents,
          id: this.id,
          botname: this.botInfo?.botname,
        })
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
        .injectIntents({
          txt: this.intents,
          id: this.id,
          botname: this.botInfo?.botname,
        })
        ?.subscribe(
          (res: any) => {
            setTimeout(() => {
              this.intents = '';
            }, 10);
          },
          (error: any) => {}
        );
    }
  }
  blankinput(): void {
    this.intents = '';
  }
}
