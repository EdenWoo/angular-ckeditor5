import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularCkeditor5Component } from './angular-ckeditor5.component';

describe('AngularCkeditor5Component', () => {
  let component: AngularCkeditor5Component;
  let fixture: ComponentFixture<AngularCkeditor5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularCkeditor5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularCkeditor5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
