import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendBComponent } from './recommendB.component';

describe('RecommendBComponent', () => {
  let component: RecommendBComponent;
  let fixture: ComponentFixture<RecommendBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
