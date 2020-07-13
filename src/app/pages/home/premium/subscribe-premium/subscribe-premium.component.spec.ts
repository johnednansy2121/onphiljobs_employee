import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribePremiumComponent } from './subscribe-premium.component';

describe('SubscribePremiumComponent', () => {
  let component: SubscribePremiumComponent;
  let fixture: ComponentFixture<SubscribePremiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribePremiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribePremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
