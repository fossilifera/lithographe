import { TestBed } from '@angular/core/testing';

import { SpecimenMapperService } from './specimen-mapper.service';

describe('SpecimenMapperService', () => {
  let service: SpecimenMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecimenMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
