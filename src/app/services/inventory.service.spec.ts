import {TestBed} from '@angular/core/testing';

import {InventoryService} from './inventory.service';
import {InventoryMetadata} from '../model/inventory-metadata';
import {ColumnMetadata} from '../model/column-metadata';
import {KeysLocalStorage} from '../enums/local-storage-keys';
import {Specimen} from '../model/specimen';

describe('InventoryService', () => {
  let service: InventoryService;

  const metadata = new InventoryMetadata('demoInventory', [new ColumnMetadata(0, 'Code'), new ColumnMetadata(1, 'Genus'), new ColumnMetadata(2, 'Species')]);
  const specimens: Specimen[] = [{id: 0, data:{code:"LTG-001", genus:'Hildoceras', species:'bifrons'}}]

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('load inventory', () => {

    beforeEach(() => {
      service.loadNewInventory(metadata, specimens);
    })

    it('should load metadata', (done) => {
      expect(service.getColumns()).toBeDefined();

      service.getColumns().subscribe(columns => {
        expect(columns).toBeDefined();
        expect(columns.at(0)?.displayName).toBe('Code');
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
      const metadataJson = window.localStorage.getItem(KeysLocalStorage.inventoryMetadata);
      const metadataParsed = metadataJson ? JSON.parse(metadataJson) as InventoryMetadata : null;
      expect(metadataParsed).toBeDefined();
      expect(metadataParsed?.columns.at(0)?.displayName).toBe('Code');
    });

    it('should persist specimens in local storage', () => {
      const specimensJson = window.localStorage.getItem(KeysLocalStorage.inventorySpecimens);
      const specimensParsed = specimensJson ? JSON.parse(specimensJson) as Specimen[] : null;
      expect(specimensParsed).toBeDefined();
      expect(specimensParsed?.at(0)?.id).toBe(0);
      expect(specimensParsed?.at(0)?.data['genus']).toBe('Hildoceras');
      expect(specimensParsed?.at(0)?.data['species']).toBe('bifrons');
    });

  });
});
