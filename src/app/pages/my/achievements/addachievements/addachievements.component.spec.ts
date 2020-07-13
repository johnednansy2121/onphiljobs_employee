import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddachievementsComponent } from './addachievements.component';

describe('AddachievementsComponent', () => {
  let component: AddachievementsComponent;
  let fixture: ComponentFixture<AddachievementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddachievementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddachievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
