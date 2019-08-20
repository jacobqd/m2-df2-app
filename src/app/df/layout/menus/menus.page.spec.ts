import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusPage } from './menus.page';

describe('MenusPage', () => {
  let component: MenusPage;
  let fixture: ComponentFixture<MenusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
