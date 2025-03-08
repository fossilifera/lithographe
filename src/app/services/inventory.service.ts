import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {LoggerService} from './logger.service';
import {InventoryMetadata} from '../model/inventory-metadata';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private logger: LoggerService = inject(LoggerService);
  private inventoryLoadingState = new BehaviorSubject<boolean>(false);

  private metadata: InventoryMetadata | undefined;

  public isInventoryLoaded(): Observable<boolean> {
    return this.inventoryLoadingState.asObservable();
  }

  public getColumNames(): string[] | undefined {
    return this.metadata?.columnNames;
  }

  public loadInventory(metadata: InventoryMetadata): void {
    this.logger.debug("InventoryService", "Loading inventory");
    this.metadata = metadata;
    this.inventoryLoadingState.next(true);
  }

}
