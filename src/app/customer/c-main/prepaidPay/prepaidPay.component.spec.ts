import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepaidPayComponent } from './prepaidPay.component';

describe('PrepaidPayComponent', () => {
  let component: PrepaidPayComponent;
  let fixture: ComponentFixture<PrepaidPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepaidPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepaidPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
