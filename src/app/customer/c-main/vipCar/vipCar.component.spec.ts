import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VipCarComponent } from './vipCar.component';

describe('VipCarComponent', () => {
  let component: VipCarComponent;
  let fixture: ComponentFixture<VipCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VipCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VipCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
