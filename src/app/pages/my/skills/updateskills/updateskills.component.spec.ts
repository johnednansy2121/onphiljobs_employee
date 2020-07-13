import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateskillsComponent } from './updateskills.component';

describe('UpdateskillsComponent', () => {
  let component: UpdateskillsComponent;
  let fixture: ComponentFixture<UpdateskillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateskillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateskillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
