import {TestBed} from '@angular/core/testing';

import {InventoryService} from './inventory.service';
import {ColumnMetadata} from './column-metadata';
import {Specimen} from './specimen';

describe('InventoryService', () => {
  let service: InventoryService;

  const fileName = 'demoInventory';
  const columns: ColumnMetadata[] =  [
    {position: 0, displayName: 'Code', jsonName:'_id'},
    {position: 1, displayName: 'Genus', jsonName:'_genus'},
    {position: 2, displayName: 'Species', jsonName:'_species'}
    ];
  const specimens: Specimen[] = [{id: 0, selected: true, data:{_id:"LTG-001", _genus:'Hildoceras', _species:'bifrons'}}]

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryService);
    service.loadNewInventory(fileName, columns, specimens);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
