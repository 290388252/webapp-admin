import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrouponOrderComponent } from './grouponOrder.component';

describe('GrouponOrderComponent', () => {
  let component: GrouponOrderComponent;
  let fixture: ComponentFixture<GrouponOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrouponOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrouponOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
