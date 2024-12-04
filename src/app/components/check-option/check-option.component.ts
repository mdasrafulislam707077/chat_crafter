import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-check-option',
  imports: [CommonModule],
  templateUrl: './check-option.component.html',
  styleUrl: './check-option.component.scss',
})
export class CheckOptionComponent {
  @Input() active: boolean = true;
  @Input() label: string = 'unset';
  onChange(): void {
    this.active = !this.active;
  }
}
