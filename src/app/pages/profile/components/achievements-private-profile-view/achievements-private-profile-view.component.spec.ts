import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementsPrivateProfileViewComponent } from './achievements-private-profile-view.component';

describe('AchievementsPrivateProfileViewComponent', () => {
  let component: AchievementsPrivateProfileViewComponent;
  let fixture: ComponentFixture<AchievementsPrivateProfileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchievementsPrivateProfileViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementsPrivateProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
