import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPremiumComponent } from './payment-premium.component';

describe('PaymentPremiumComponent', () => {
  let component: PaymentPremiumComponent;
  let fixture: ComponentFixture<PaymentPremiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentPremiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
