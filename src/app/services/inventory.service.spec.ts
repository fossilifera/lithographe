import { TestBed } from '@angular/core/testing';

import { InventoryService } from './inventory.service';
import {InventoryMetadata} from '../model/inventory-metadata';

describe('InventoryService', () => {
  let service: InventoryService;

  const metadata = new InventoryMetadata(['One', 'Two', 'Three']);

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('load inventory', () => {

    beforeEach(() => {
      service.loadInventory(metadata);
    })

    it('should load metadata', () => {
      expect(service.getColumNames()).toBeDefined();
      expect(service.getColumNames()?.at(0)).toBe('One');
    });

    it('should notify loading', (done) => {
      service.isInventoryLoaded().subscribe(isInventoryLoaded => {
        expect(isInventoryLoaded).toBe(true);
        done();
      });
    });
  });
});
