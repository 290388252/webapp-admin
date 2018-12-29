import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BargainDetailsShareComponent } from './bargainDetailsShare.component';

describe('BargainDetailsShareComponent', () => {
  let component: BargainDetailsShareComponent;
  let fixture: ComponentFixture<BargainDetailsShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BargainDetailsShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BargainDetailsShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
