import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRewardsComponent } from './all-rewards.component';

describe('AllRewardsComponent', () => {
  let component: AllRewardsComponent;
  let fixture: ComponentFixture<AllRewardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllRewardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
