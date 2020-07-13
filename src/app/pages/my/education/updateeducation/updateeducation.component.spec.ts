import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateeducationComponent } from './updateeducation.component';

describe('UpdateeducationComponent', () => {
  let component: UpdateeducationComponent;
  let fixture: ComponentFixture<UpdateeducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateeducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateeducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
