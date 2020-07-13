import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateProfileComponentComponent } from './private-profile-component.component';

describe('PrivateProfileComponentComponent', () => {
  let component: PrivateProfileComponentComponent;
  let fixture: ComponentFixture<PrivateProfileComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateProfileComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateProfileComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
