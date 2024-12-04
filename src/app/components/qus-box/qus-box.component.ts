import { Component, EventEmitter, Output } from '@angular/core';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
@Component({
  selector: 'app-qus-box',
  imports: [DialogBoxComponent],
  templateUrl: './qus-box.component.html',
  styleUrl: './qus-box.component.scss',
})
export class QusBoxComponent {
  @Output() onYes: EventEmitter<void>;
  @Output() onNo: EventEmitter<void>;
  @Output() onClose: EventEmitter<void>;
  constructor() {
    this.onYes = new EventEmitter();
    this.onNo = new EventEmitter();
    this.onClose = new EventEmitter();
  }
  clickYes(): void {
    this.onYes.emit();
  }
  clickNo(): void {
    this.onNo.emit();
  }
  clickClose(): void {
    this.onClose.emit();
  }
}
