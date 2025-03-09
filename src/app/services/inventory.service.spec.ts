import {TestBed} from '@angular/core/testing';

import {InventoryService} from './inventory.service';
import {InventoryMetadata} from '../model/inventory-metadata';
import {LOCAL_STORAGE_METADATA_KEY} from '../constants';

describe('InventoryService', () => {
  let service: InventoryService;

  const firstColumnName: string = 'One';
  const metadata = new InventoryMetadata([{position:0, name:firstColumnName}, {position:1, name:'Two'}, {position:2, name:'Three'}]);

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('load inventory', () => {

    beforeEach(() => {
      service.loadInventory(metadata, []);
    })

    it('should load metadata', (done) => {
      expect(service.getColumns()).toBeDefined();

      service.getColumns().subscribe(columns => {
        expect(columns).toBeDefined();
        expect(columns.at(0)?.name).toBe(firstColumnName);
        done();
      });
    });

    it('should notify loading', (done) => {
      service.isInventoryLoaded().subscribe(isInventoryLoaded => {
        expect(isInventoryLoaded).toBe(true);
        done();
      });
    });

    it('should persist metadata in local storage', () => {
      const metadataJson = window.localStorage.getItem(LOCAL_STORAGE_METADATA_KEY);
      const metadata = metadataJson ? JSON.parse(metadataJson) as InventoryMetadata : null;
      expect(metadata).toBeDefined();
      expect(metadata?.columns.at(0)?.name).toBe(firstColumnName);
    });

  });
});
