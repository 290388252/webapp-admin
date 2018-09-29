import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VipPayComponent } from './vipPay.component';

describe('VipCarComponent', () => {
  let component: VipPayComponent;
  let fixture: ComponentFixture<VipPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VipPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VipPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
