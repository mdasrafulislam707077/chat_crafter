import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectBotInfo } from '../../ngrx/botinfo/selectors/botinfo';
import { AppState } from '../../ngrx/store';
import { IntentsService } from '../../services/network/intents.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { LoadingSComponent } from '../loading-s/loading-s.component';
import { QusBoxComponent } from '../qus-box/qus-box.component';
@Component({
  selector: 'app-selection-items',
  standalone: true,
  imports: [
    CommonModule,
    LoadingSComponent,
    FormsModule,
    DialogBoxComponent,
    QusBoxComponent,
  ],
  templateUrl: './selection-items.component.html',
  styleUrls: ['./selection-items.component.scss'],
})
export class SelectionItemsComponent implements OnInit {
  itemName: string = '';
  items: any[] = [];
  setView: any = null;
  botInfo: any;
  storeId?: string | null;
  constructor(
    private intentService: IntentsService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.storeId = null;
  }

  showInfo(id: string): void {
    const find: any = this.items.find((element: any, index: number) => {
      return element.id == id;
    });
    this.setView = find;
  }
  permissionDelete(id: string): void {
    this.storeId = id;
  }
  closedialog(): void {
    this.storeId = null;
  }

  deleteIntent(): void {
    if (this.botInfo.botname) {
      this.intentService
        .deleteIntent(this.storeId, this.botInfo.botname)
        .subscribe(
          (res: any) => {
            this.items = [...res.items];
            this.storeId = null;
          },
          (err: any) => {
            console.log(err);
          }
        );
    }
  }

  clickItem(id: string): void {
    this.router.navigate([`/intent-details/${id}`]);
  }

  ngOnInit(): void {
    this.store.pipe(select(selectBotInfo)).subscribe((botInfo: any) => {
      this.botInfo = botInfo;
      this.botInfo = this.botInfo;

      if (this.botInfo) {
        this.intentService.getIntent({ name: this.botInfo.botname }).subscribe(
          (res: any) => {
            this.items = res?.items;
          },
          (err: any) => {}
        );
      }
    });
  }
  createIntent(): void {
    this.intentService
      .createIntent({ name: this.itemName, botname: this.botInfo.botname })
      ?.subscribe(
        (res: any) => {
          this.items = [res?.item, ...this.items];
          this.itemName = '';
        },
        (err: any) => {
          console.log(err);
        }
      );
  }
}
