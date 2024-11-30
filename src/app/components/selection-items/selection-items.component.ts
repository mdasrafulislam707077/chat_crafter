import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IntentsService } from '../../services/network/intents.service';
import { LoadingSComponent } from '../loading-s/loading-s.component';
@Component({
  selector: 'app-selection-items',
  standalone: true,
  imports: [CommonModule, LoadingSComponent, FormsModule],
  templateUrl: './selection-items.component.html',
  styleUrls: ['./selection-items.component.scss'],
})
export class SelectionItemsComponent implements OnInit {
  itemName: string = '';
  items: any[] = [];
  constructor(private intentService: IntentsService) {}
  deleteIntent(id:string): void {}
  ngOnInit(): void {
    this.intentService.getIntent().subscribe(
      (res: any) => {
        this.items = res?.items;
      },
      (err: any) => {}
    );
  }
  createIntent(): void {
    this.intentService.createIntent({ name: this.itemName })?.subscribe(
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
