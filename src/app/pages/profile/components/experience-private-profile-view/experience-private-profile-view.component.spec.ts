import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencePrivateProfileViewComponent } from './experience-private-profile-view.component';

describe('ExperiencePrivateProfileViewComponent', () => {
  let component: ExperiencePrivateProfileViewComponent;
  let fixture: ComponentFixture<ExperiencePrivateProfileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperiencePrivateProfileViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperiencePrivateProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
