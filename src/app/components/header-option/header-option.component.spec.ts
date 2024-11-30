import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOptionComponent } from './header-option.component';

describe('HeaderOptionComponent', () => {
  let component: HeaderOptionComponent;
  let fixture: ComponentFixture<HeaderOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderOptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
