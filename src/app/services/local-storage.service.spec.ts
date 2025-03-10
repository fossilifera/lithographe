import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import {KeysLocalStorage} from '../enums/local-storage-keys';
import {InventoryMetadata} from '../model/inventory-metadata';
import {Specimen} from '../model/specimen';
import {ColumnMetadata} from '../model/column-metadata';

describe('LocalStorageService', () => {
  let service: StorageService;

  const metadata = new InventoryMetadata('demoInventory', [new ColumnMetadata(0, 'Code'), new ColumnMetadata(1, 'Genus'), new ColumnMetadata(2, 'Species')]);
  const specimens: Specimen[] = [{id: 0, data:{code:"LTG-001", genus:'Hildoceras', species:'bifrons'}}]

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should persist metadata in local storage', () => {
    service.persistMetadata(metadata);

    const metadataJson = window.localStorage.getItem(KeysLocalStorage.inventoryMetadata);
    const metadataParsed = metadataJson ? JSON.parse(metadataJson) as InventoryMetadata : null;
    expect(metadataParsed).toBeDefined();
    expect(metadataParsed?.columns.at(0)?.displayName).toBe('Code');
  });

  it('should persist specimens in local storage', () => {
    service.persistSpecimens(specimens);

    const specimensJson = window.localStorage.getItem(KeysLocalStorage.inventorySpecimens);
    const specimensParsed = specimensJson ? JSON.parse(specimensJson) as Specimen[] : null;
    expect(specimensParsed).toBeDefined();
    expect(specimensParsed?.at(0)?.id).toBe(0);
    expect(specimensParsed?.at(0)?.data['genus']).toBe('Hildoceras');
    expect(specimensParsed?.at(0)?.data['species']).toBe('bifrons');
  });
});
