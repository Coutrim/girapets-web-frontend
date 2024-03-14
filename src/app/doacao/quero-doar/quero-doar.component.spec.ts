/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QueroDoarComponent } from './quero-doar.component';

describe('QueroDoarComponent', () => {
  let component: QueroDoarComponent;
  let fixture: ComponentFixture<QueroDoarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueroDoarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueroDoarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
