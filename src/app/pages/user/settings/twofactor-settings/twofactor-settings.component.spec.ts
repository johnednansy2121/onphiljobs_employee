import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwofactorSettingsComponent } from './twofactor-settings.component';

describe('TwofactorSettingsComponent', () => {
  let component: TwofactorSettingsComponent;
  let fixture: ComponentFixture<TwofactorSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwofactorSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwofactorSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
