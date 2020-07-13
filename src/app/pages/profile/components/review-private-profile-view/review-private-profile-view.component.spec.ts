import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPrivateProfileViewComponent } from './review-private-profile-view.component';

describe('ReviewPrivateProfileViewComponent', () => {
  let component: ReviewPrivateProfileViewComponent;
  let fixture: ComponentFixture<ReviewPrivateProfileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewPrivateProfileViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewPrivateProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
