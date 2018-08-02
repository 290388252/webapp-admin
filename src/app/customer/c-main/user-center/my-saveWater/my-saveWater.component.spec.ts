import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySaveWaterComponent } from './my-saveWater.component';

describe('PayComponent', () => {
  let component: MySaveWaterComponent;
  let fixture: ComponentFixture<MySaveWaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySaveWaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySaveWaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
