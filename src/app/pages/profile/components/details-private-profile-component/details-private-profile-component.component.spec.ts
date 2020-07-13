import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPrivateProfileComponentComponent } from './details-private-profile-component.component';

describe('DetailsPrivateProfileComponentComponent', () => {
  let component: DetailsPrivateProfileComponentComponent;
  let fixture: ComponentFixture<DetailsPrivateProfileComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsPrivateProfileComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPrivateProfileComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
