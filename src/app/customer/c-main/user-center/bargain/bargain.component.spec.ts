import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BargainComponent } from './bargain.component';

describe('BargainComponent', () => {
  let component: BargainComponent;
  let fixture: ComponentFixture<BargainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BargainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BargainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
