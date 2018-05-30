import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplenishmentDetailComponent } from './replenishment-detail.component';

describe('ReplenishmentDetailComponent', () => {
  let component: ReplenishmentDetailComponent;
  let fixture: ComponentFixture<ReplenishmentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplenishmentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplenishmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
