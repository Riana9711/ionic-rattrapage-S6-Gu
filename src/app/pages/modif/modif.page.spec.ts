import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifPage } from './modif.page';

describe('ModifPage', () => {
  let component: ModifPage;
  let fixture: ComponentFixture<ModifPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
