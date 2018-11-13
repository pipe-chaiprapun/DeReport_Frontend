import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamChartComponent } from './exam-chart.component';

describe('ExamChartComponent', () => {
  let component: ExamChartComponent;
  let fixture: ComponentFixture<ExamChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
