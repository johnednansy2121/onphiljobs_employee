import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateexperienceComponent } from './updateexperience.component';

describe('UpdateexperienceComponent', () => {
  let component: UpdateexperienceComponent;
  let fixture: ComponentFixture<UpdateexperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateexperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateexperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
