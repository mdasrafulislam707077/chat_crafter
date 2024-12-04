import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntentdetailsComponent } from './intentdetails.component';

describe('IntentdetailsComponent', () => {
  let component: IntentdetailsComponent;
  let fixture: ComponentFixture<IntentdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntentdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntentdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
