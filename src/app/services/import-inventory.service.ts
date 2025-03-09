import {inject, Injectable} from '@angular/core';
import {InventoryService} from './inventory.service';
import {DEMO_INVENTORY_METADATA, DEMO_INVENTORY_SPECIMENS} from './demo-inventory';

@Injectable({
  providedIn: 'root'
})
export class ImportInventoryService {

  private inventoryService: InventoryService = inject(InventoryService);

  public loadDemoInventory(): void {
    this.inventoryService.loadInventory(DEMO_INVENTORY_METADATA, DEMO_INVENTORY_SPECIMENS);
  }
}
