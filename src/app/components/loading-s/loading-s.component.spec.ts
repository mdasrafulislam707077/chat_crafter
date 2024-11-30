import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSComponent } from './loading-s.component';

describe('LoadingSComponent', () => {
  let component: LoadingSComponent;
  let fixture: ComponentFixture<LoadingSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
