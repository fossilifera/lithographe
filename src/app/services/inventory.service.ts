import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {LoggerService} from './logger.service';
import {InventoryMetadata} from '../model/inventory-metadata';
import {Specimen} from '../model/specimen';
import {ColumnMetadata} from '../model/column-metadata';
import {KeysLocalStorage} from '../enums/local-storage-keys';


@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private logger: LoggerService = inject(LoggerService);
  private inventoryLoadingState = new BehaviorSubject<boolean>(false);

  private metadataSubject = new BehaviorSubject<InventoryMetadata | undefined>(undefined)
  private specimensSubject = new BehaviorSubject<Specimen[]>([]);

  public isInventoryLoaded(): Observable<boolean> {
    return this.inventoryLoadingState.asObservable();
  }

  public getColumns(): Observable<ColumnMetadata[]> {
    return this.metadataSubject.asObservable()
      .pipe(map(metadata => metadata?.columns ?? []));
  }

  public getSpecimens(): Observable<Specimen[]> {
    return this.specimensSubject.asObservable();
  }

  public loadInventory(metadata: InventoryMetadata, specimens: Specimen[]): void {
    this.logger.info("InventoryService", "Loading inventory");
    this.persistMetadata(metadata);
    this.metadataSubject.next(metadata);
    this.persistSpecimens(specimens);
    this.specimensSubject.next(specimens);
    this.inventoryLoadingState.next(true);
  }

  private persistMetadata(metadata: InventoryMetadata): void {
    this.logger.debug("InventoryService", "Saving inventory metadata in local storage")
    window.localStorage.setItem(KeysLocalStorage.inventoryMetadata, JSON.stringify(metadata));
  }

  private persistSpecimens(specimens: Specimen[]): void {
    this.logger.debug("InventoryService", "Saving inventory specimens in local storage")
    window.localStorage.setItem(KeysLocalStorage.inventorySpecimens, JSON.stringify(specimens));
  }

}
