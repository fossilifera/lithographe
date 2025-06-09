import { TestBed } from '@angular/core/testing';

import { ImportInventoryService } from './import-inventory.service';

describe('ImportInventoryService', () => {
  let service: ImportInventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportInventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
