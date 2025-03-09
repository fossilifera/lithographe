import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {LoggerService} from './logger.service';
import {InventoryMetadata} from '../model/inventory-metadata';
import {LOCAL_STORAGE_METADATA_KEY} from '../constants';
import {ColumnMetadata} from '../model/column-metadata';
import {Specimen} from '../model/specimen';


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
    this.metadataSubject.next(metadata);
    this.persistMetadataInLocalStorage(metadata);
    this.specimensSubject.next(specimens);
    this.inventoryLoadingState.next(true);
  }

  private persistMetadataInLocalStorage(metadata: InventoryMetadata): void {
    window.localStorage.setItem(LOCAL_STORAGE_METADATA_KEY, JSON.stringify(metadata));
  }

}
