import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichePage } from './fiche.page';

describe('FichePage', () => {
  let component: FichePage;
  let fixture: ComponentFixture<FichePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
