import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrouponRefundComponent } from './grouponRefund.component';

describe('GrouponRefundComponent', () => {
  let component: GrouponRefundComponent;
  let fixture: ComponentFixture<GrouponRefundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrouponRefundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrouponRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
