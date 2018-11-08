import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayFinishComponent } from './payFinish.component';

describe('PayFinishComponent', () => {
  let component: PayFinishComponent;
  let fixture: ComponentFixture<PayFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayFinishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
