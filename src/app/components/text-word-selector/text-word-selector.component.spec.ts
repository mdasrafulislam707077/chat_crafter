import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextWordSelectorComponent } from './text-word-selector.component';

describe('TextWordSelectorComponent', () => {
  let component: TextWordSelectorComponent;
  let fixture: ComponentFixture<TextWordSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextWordSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextWordSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
