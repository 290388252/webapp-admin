import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BargainListComponent } from './bargainList.component';

describe('BargainListComponent', () => {
  let component: BargainListComponent;
  let fixture: ComponentFixture<BargainListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BargainListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BargainListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
