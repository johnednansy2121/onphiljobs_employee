import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfoliosPrivateProfileViewComponent } from './portfolios-private-profile-view.component';

describe('PortfoliosPrivateProfileViewComponent', () => {
  let component: PortfoliosPrivateProfileViewComponent;
  let fixture: ComponentFixture<PortfoliosPrivateProfileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfoliosPrivateProfileViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfoliosPrivateProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
