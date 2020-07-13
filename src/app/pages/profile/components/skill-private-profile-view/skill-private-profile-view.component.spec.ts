import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillPrivateProfileViewComponent } from './skill-private-profile-view.component';

describe('SkillPrivateProfileViewComponent', () => {
  let component: SkillPrivateProfileViewComponent;
  let fixture: ComponentFixture<SkillPrivateProfileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillPrivateProfileViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillPrivateProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
