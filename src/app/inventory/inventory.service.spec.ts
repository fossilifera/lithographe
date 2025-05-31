import {TestBed} from '@angular/core/testing';

import {InventoryService} from './inventory.service';
import {ColumnMetadata} from './column-metadata';
import {Specimen} from './specimen';

describe('InventoryService', () => {
  let service: InventoryService;

  const fileName = 'demoInventory';
  const columns =  [new ColumnMetadata(0, 'Code'), new ColumnMetadata(1, 'Genus'), new ColumnMetadata(2, 'Species')];
  const specimens: Specimen[] = [{id: 0, selected: true, data:{code:"LTG-001", genus:'Hildoceras', species:'bifrons'}}]

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryService);
    service.loadNewInventory(fileName, columns, specimens);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
