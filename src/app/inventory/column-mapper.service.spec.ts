import { TestBed } from '@angular/core/testing';

import { ColumnMapperService } from './column-mapper.service';

describe('ColumnMapperService', () => {
  let service: ColumnMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColumnMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
