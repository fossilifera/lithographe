import {TestBed} from '@angular/core/testing';

import {InventoryService} from './inventory.service';
import {DEMO_INVENTORY_NAME, DEMO_INVENTORY_SPECIMENS} from './demo-inventory';

describe('InventoryService', () => {
  let service: InventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryService);
    service.loadNewInventory(DEMO_INVENTORY_NAME, DEMO_INVENTORY_SPECIMENS);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
