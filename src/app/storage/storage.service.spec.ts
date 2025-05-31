import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import {KeysLocalStorage} from './local-storage-keys';
import {Specimen} from '../inventory/specimen';

describe('StorageService', () => {
  let service: StorageService;

  const specimens: Specimen[] = [{id: 0, data:{code:"LTG-001", genus:'Hildoceras', species:'bifrons'}}]

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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
