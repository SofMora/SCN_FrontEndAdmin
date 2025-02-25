import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsAnswersManagementComponent } from './questions-answers-management.component';

describe('QuestionsAnswersManagementComponent', () => {
  let component: QuestionsAnswersManagementComponent;
  let fixture: ComponentFixture<QuestionsAnswersManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionsAnswersManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionsAnswersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
