import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListachievementsComponent } from './listachievements.component';

describe('ListachievementsComponent', () => {
  let component: ListachievementsComponent;
  let fixture: ComponentFixture<ListachievementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListachievementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListachievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
