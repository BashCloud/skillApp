import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersInfoComponent } from './others-info.component';

describe('OthersInfoComponent', () => {
  let component: OthersInfoComponent;
  let fixture: ComponentFixture<OthersInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthersInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
