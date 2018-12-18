import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalePathComponent } from './sale-path.component';

describe('SalePathComponent', () => {
  let component: SalePathComponent;
  let fixture: ComponentFixture<SalePathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalePathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalePathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
