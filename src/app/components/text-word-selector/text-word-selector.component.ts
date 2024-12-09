import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import { selectBotInfo } from '../../ngrx/botinfo/selectors/botinfo';
import { AppState } from '../../ngrx/store';
import { IntentsService } from '../../services/network/intents.service';
@Component({
  selector: 'app-text-word-selector',
  imports: [CommonModule],
  templateUrl: './text-word-selector.component.html',
  styleUrl: './text-word-selector.component.scss',
})
export class TextWordSelectorComponent implements OnInit {
  @Output() onClose: EventEmitter<void>;
  list_of_words: any[] = [];
  list_of_alt_target: any[] = [];
  wordSelector: any;
  @Input() list_of_alter_items: any[];
  select_actarnative_word: any;
  labelWord: string;
  alternativeOfSelectWord: any;
  id: any;
  // addAlterWordlabel
  botInfo: any;
  @Input() textBox: string = '';
  @Input() text: string = '';

  constructor(
    private intentsService: IntentsService,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.alternativeOfSelectWord = '';
    this.labelWord = '';
    this.list_of_alter_items = [];
    this.wordSelector = null;
    this.onClose = new EventEmitter<void>();
    this.id = this.route?.snapshot?.params['id'];
  }
  ngOnInit() {
    this.store.pipe(select(selectBotInfo)).subscribe((botInfo: any) => {
      this.botInfo = botInfo;
      this.botInfo = this.botInfo;
    });
    let wordCount = 0;
    for (const element of this.text.split(' ')) {
      wordCount++;
      this.list_of_words.push({
        word: element,
        id: uuidv4(),
        nullType: false,
        toolT: false,
      });
      if (this.text.split(' ').length != wordCount) {
        this.list_of_words.push({
          word: ' ',
          id: uuidv4(),
          nullType: true,
          toolT: false,
        });
      }
    }
  }
  selectedWordItem(i: any): void {
    this.select_actarnative_word = i;
  }
  ondoubleClick(word: any): void {
    this.wordSelector = word;
  }
  labelWordInput(e: any): void {
    this.labelWord = e.target.value;
  }
  addlabelWord(): void {
    const findObj: any = this.list_of_alter_items.find(
      (element) => element.word == this.labelWord
    );
    if (!this.labelWord) {
      return;
    }
    if (findObj) {
      return;
    }
    this.intentsService
      .addAlterWordlabel(this.id, {
        id: uuidv4(),
        alter: [],
        word: this.labelWord,
        botname: this.botInfo.botname,
      })
      ?.subscribe(
        (res: any) => {
          this.list_of_alter_items = res.items;
          this.labelWord = '';
        },
        (error: any) => {}
      );
  }
  onChangeAlterNativeinput(e: any) {
    this.alternativeOfSelectWord = e.target.value;
  }
  addAlterWord(): void {
    if (!this.alternativeOfSelectWord) {
      return;
    }
    if (!this.select_actarnative_word) {
      return;
    }
    this.intentsService
      .addAlterWord(this.id, {
        botname: this.botInfo.botname,
        word_id: this.select_actarnative_word.id,
        new_word: this.alternativeOfSelectWord,
      })
      ?.subscribe(
        (res: any) => {
          this.select_actarnative_word.alter = [...res.items];
        },
        (error: any) => {}
      );

    this.alternativeOfSelectWord = '';
  }
  deleteAlternativeWordItem(i:any):void{
    this.intentsService.removeAlterWordItem(this.id,{
      botname: this.botInfo.botname,
        word_id: this.select_actarnative_word.id,
        remove_id: i.id,
    })?.subscribe((res:any)=>{
      this.select_actarnative_word.alter = [...res.items];
    },(err:any)=>{})
  }
  deleteWord(e: any): void {
    if (
      this.select_actarnative_word &&
      this.select_actarnative_word.id == e.id
    ) {
      this.select_actarnative_word = null;
    }
    this.intentsService
      .deleteAlterLabel(this.id, {
        id: e.id,
        botname: this.botInfo.botname,
      })
      ?.subscribe(
        (res: any) => {
          this.list_of_alter_items = res.items;
        },
        (error: any) => {}
      );
  }
  clearSelector() {
    this.wordSelector = null;
    this.select_actarnative_word = null;
  }
  close(): void {
    this.onClose.emit();
  }
}
