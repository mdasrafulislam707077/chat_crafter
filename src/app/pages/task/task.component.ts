import { Component } from '@angular/core';
import { SelectionItemsComponent } from "../../components/selection-items/selection-items.component";

@Component({
  selector: 'app-task',
  imports: [SelectionItemsComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

}
