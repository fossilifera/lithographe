import {inject, Injectable} from '@angular/core';
import {InventoryService} from './inventory.service';
import {LoggerService} from './logger.service';
import {InventoryMetadata} from '../model/inventory-metadata';

@Injectable({
  providedIn: 'root'
})
export class ImportInventoryService {

  private logger: LoggerService = inject(LoggerService);
  private inventoryService: InventoryService = inject(InventoryService);

  public loadDemoInventory(): void {
    let metadata = new InventoryMetadata(["Number","Genus", "species"]);
    this.inventoryService.loadInventory(metadata);
  }
}
