import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSignalrComponent } from './test-signalr.component';

describe('TestSignalrComponent', () => {
  let component: TestSignalrComponent;
  let fixture: ComponentFixture<TestSignalrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSignalrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSignalrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
