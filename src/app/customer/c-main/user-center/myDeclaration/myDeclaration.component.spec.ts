import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDeclarationComponent } from './myDeclaration.component';

describe('MyDeclarationComponent', () => {
  let component: MyDeclarationComponent;
  let fixture: ComponentFixture<MyDeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
