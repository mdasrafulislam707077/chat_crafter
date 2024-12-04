import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QusBoxComponent } from './qus-box.component';

describe('QusBoxComponent', () => {
  let component: QusBoxComponent;
  let fixture: ComponentFixture<QusBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QusBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QusBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
