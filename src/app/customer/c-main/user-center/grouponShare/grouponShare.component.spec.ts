import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrouponShareComponent } from './grouponShare.component';

describe('GrouponShareComponent', () => {
  let component: GrouponShareComponent;
  let fixture: ComponentFixture<GrouponShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrouponShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrouponShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
