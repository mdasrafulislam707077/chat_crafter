import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-list-item',
  imports: [],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss',
})
export class ListItemComponent {
  @Input() txt: string = '';
  @Output() onDelete: EventEmitter<any>;
  constructor() {
    this.onDelete = new EventEmitter<any>();
  }
  deleteItem(): void {
    this.onDelete.emit();
  }
}
