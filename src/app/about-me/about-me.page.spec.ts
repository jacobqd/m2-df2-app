import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMePage } from './about-me.page';

describe('AboutMePage', () => {
  let component: AboutMePage;
  let fixture: ComponentFixture<AboutMePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutMePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutMePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
