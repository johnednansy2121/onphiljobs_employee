import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationPrivateProfileViewComponent } from './education-private-profile-view.component';

describe('EducationPrivateProfileViewComponent', () => {
  let component: EducationPrivateProfileViewComponent;
  let fixture: ComponentFixture<EducationPrivateProfileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationPrivateProfileViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationPrivateProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
