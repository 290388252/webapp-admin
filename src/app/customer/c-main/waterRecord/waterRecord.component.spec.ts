import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterRecordComponent} from './waterRecord.component';

describe('PayComponent', () => {
  let component: WaterRecordComponent;
  let fixture: ComponentFixture<WaterRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
