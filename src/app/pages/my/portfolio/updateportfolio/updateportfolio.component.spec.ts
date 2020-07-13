import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateportfolioComponent } from './updateportfolio.component';

describe('UpdateportfolioComponent', () => {
  let component: UpdateportfolioComponent;
  let fixture: ComponentFixture<UpdateportfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateportfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateportfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
