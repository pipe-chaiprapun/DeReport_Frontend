import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractPaymentComponent } from './contract-payment.component';

describe('ContractPaymentComponent', () => {
  let component: ContractPaymentComponent;
  let fixture: ComponentFixture<ContractPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
