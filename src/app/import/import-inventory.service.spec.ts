import { TestBed } from '@angular/core/testing';
import {beforeEach, describe, expect, it} from 'vitest';

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
