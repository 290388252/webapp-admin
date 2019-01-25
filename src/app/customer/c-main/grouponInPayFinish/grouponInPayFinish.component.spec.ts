import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrouponInPayFinishComponent } from './grouponInPayFinish.component';

describe('GrouponInPayFinishComponent', () => {
  let component: GrouponInPayFinishComponent;
  let fixture: ComponentFixture<GrouponInPayFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrouponInPayFinishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrouponInPayFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
