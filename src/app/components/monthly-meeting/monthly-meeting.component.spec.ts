import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyMeetingComponent } from './monthly-meeting.component';

describe('MonthlyMeetingComponent', () => {
  let component: MonthlyMeetingComponent;
  let fixture: ComponentFixture<MonthlyMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
