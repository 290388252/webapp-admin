import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrouponDetailsComponent } from './grouponDetails.component';

describe('GrouponDetailsComponent', () => {
  let component: GrouponDetailsComponent;
  let fixture: ComponentFixture<GrouponDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrouponDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrouponDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
