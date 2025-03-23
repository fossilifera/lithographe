import { TestBed } from '@angular/core/testing';

import { VariablesMapperService } from './variables-mapper.service';

describe('VariablesMapperService', () => {
  let service: VariablesMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariablesMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
