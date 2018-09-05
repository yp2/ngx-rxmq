import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoBComponent } from './demo-b.component';

describe('DemoBComponent', () => {
  let component: DemoBComponent;
  let fixture: ComponentFixture<DemoBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
