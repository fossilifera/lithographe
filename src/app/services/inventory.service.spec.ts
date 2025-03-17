import {TestBed} from '@angular/core/testing';

import {InventoryService} from './inventory.service';
import {InventoryMetadata} from '../model/inventory-metadata';
import {ColumnMetadata} from '../model/column-metadata';
import {Specimen} from '../model/specimen';

describe('InventoryService', () => {
  let service: InventoryService;

  const metadata = new InventoryMetadata('demoInventory', [new ColumnMetadata(0, 'Code'), new ColumnMetadata(1, 'Genus'), new ColumnMetadata(2, 'Species')]);
  const specimens: Specimen[] = [{id: 0, selected: true, data:{code:"LTG-001", genus:'Hildoceras', species:'bifrons'}}]

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


  });
});
