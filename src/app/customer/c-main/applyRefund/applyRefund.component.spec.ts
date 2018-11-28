import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {ApplyRefundComponent} from './applyRefund.component';

describe('ApplyRefundComponent', () => {
  let component: ApplyRefundComponent;
  let fixture: ComponentFixture<ApplyRefundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyRefundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
