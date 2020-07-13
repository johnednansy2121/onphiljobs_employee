import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateachievementComponent } from './updateachievement.component';

describe('UpdateachievementComponent', () => {
  let component: UpdateachievementComponent;
  let fixture: ComponentFixture<UpdateachievementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateachievementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateachievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
