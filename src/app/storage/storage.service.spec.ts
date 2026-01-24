import {TestBed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from 'vitest';

import {StorageService} from './storage.service';
import {KeysLocalStorage} from './local-storage-keys';
import {Specimen} from '../inventory/specimen';

describe('StorageService', () => {
  let service: StorageService;

  const specimens: Specimen[] = [{
    id: 0,
    selected: true,
    number: "LTG-001",
    genus: 'Hildoceras',
    species: 'bifrons',
    phylum: "Mollusca",
    class: "Cephalopoda",
    order: "Ammonoidea",
    family: "Hildoceratidae",
    author: "(Bruguière, 1789)",
    country: "France",
    region: "",
    location: "",
    age: "Toarcien",
    lithostratigraphy: "",
    status: ""
  }]

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
    expect(specimensParsed?.at(0)?.genus).toBe('Hildoceras');
    expect(specimensParsed?.at(0)?.species).toBe('bifrons');
  });
});
