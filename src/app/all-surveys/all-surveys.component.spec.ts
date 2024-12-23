import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSurveysComponent } from './all-surveys.component';

describe('AllSurveysComponent', () => {
  let component: AllSurveysComponent;
  let fixture: ComponentFixture<AllSurveysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllSurveysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
