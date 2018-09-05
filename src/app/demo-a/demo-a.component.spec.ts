import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoAComponent } from './demo-a.component';

describe('DemoAComponent', () => {
  let component: DemoAComponent;
  let fixture: ComponentFixture<DemoAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
