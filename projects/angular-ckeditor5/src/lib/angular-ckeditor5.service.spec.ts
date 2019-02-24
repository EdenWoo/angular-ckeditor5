import { TestBed } from '@angular/core/testing';

import { AngularCkeditor5Service } from './angular-ckeditor5.service';

describe('AngularCkeditor5Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularCkeditor5Service = TestBed.get(AngularCkeditor5Service);
    expect(service).toBeTruthy();
  });
});
