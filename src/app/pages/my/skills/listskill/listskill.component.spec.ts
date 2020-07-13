import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListskillComponent } from './listskill.component';

describe('ListskillComponent', () => {
  let component: ListskillComponent;
  let fixture: ComponentFixture<ListskillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListskillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListskillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
