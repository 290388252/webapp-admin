import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterCouponComponent } from './waterCoupon.component';

describe('WaterCouponComponent', () => {
  let component: WaterCouponComponent;
  let fixture: ComponentFixture<WaterCouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterCouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
