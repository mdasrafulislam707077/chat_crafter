import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router,ActivatedRoute,NavigationEnd  } from '@angular/router';
@Component({
  selector: 'app-navigation',
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  @Output() onActive;
  constructor(private router: Router) {
    this.onActive = new EventEmitter<number>();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const findInfo:any = this.items?.find((element:any,index:any)=>{
          return element.path == event.url.replace("/","")
        })
        this.activeIndex = findInfo?.index
      }
    });
  }
  activeIndex: number = 1;
  items = [
    { index: 1, icon: 'icon/nav/intents.png', label: 'Intents', path: '' },
    {
      path: 'response',
      index: 2,
      icon: 'icon/nav/response.png',
      label: 'Response',
    },
    {
      path: 'custom-actions',
      index: 3,
      icon: 'icon/nav/custom-actions.png',
      label: 'Custom-Actions',
    },
    {
      path: 'entities',
      index: 4,
      icon: 'icon/nav/entities.png',
      label: 'Entities',
    },
    { path: 'task', index: 5, icon: 'icon/nav/task.png', label: 'Task' },
    {
      path: 'synonyms',
      index: 6,
      icon: 'icon/nav/synonym.png',
      label: 'Synonyms',
    },
    {
      path: 'condition',
      index: 7,
      icon: 'icon/nav/condition.png',
      label: 'Condition',
    },
    {
      path: 'scripts',
      index: 8,
      icon: 'icon/nav/sctipts.png',
      label: 'Scripts',
    },
  ];
  swtNav(i: number, path: string) {
    this.activeIndex = i ?? 1;
    this.router.navigate([`/${path}`]);
    this.onActive.emit(this.activeIndex);
  }
}
