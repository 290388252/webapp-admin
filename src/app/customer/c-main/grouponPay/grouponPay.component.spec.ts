import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrouponPayComponent } from './grouponPay.component';

describe('GrouponPayComponent', () => {
  let component: GrouponPayComponent;
  let fixture: ComponentFixture<GrouponPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrouponPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrouponPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
