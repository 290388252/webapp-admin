import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BargainDetailsComponent } from './bargainDetails.component';

describe('BargainDetailsComponent', () => {
  let component: BargainDetailsComponent;
  let fixture: ComponentFixture<BargainDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BargainDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BargainDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
