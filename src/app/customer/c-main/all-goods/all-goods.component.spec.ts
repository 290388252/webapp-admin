import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGoodsComponent } from './all-goods.component';

describe('AllGoodsComponent', () => {
  let component: AllGoodsComponent;
  let fixture: ComponentFixture<AllGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
