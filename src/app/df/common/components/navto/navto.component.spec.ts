import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavtoComponent } from './navto.component';

describe('NavtoComponent', () => {
  let component: NavtoComponent;
  let fixture: ComponentFixture<NavtoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavtoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
