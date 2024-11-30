import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionItemsComponent } from './selection-items.component';

describe('SelectionItemsComponent', () => {
  let component: SelectionItemsComponent;
  let fixture: ComponentFixture<SelectionItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectionItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectionItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
