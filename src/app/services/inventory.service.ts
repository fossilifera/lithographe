import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {LoggerService} from './logger.service';
import {InventoryMetadata} from '../model/inventory-metadata';
import {Specimen} from '../model/specimen';
import {ColumnMetadata} from '../model/column-metadata';
import {KeysLocalStorage} from '../enums/local-storage-keys';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private logger: LoggerService = inject(LoggerService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private inventoryLoadingState = new BehaviorSubject<boolean>(false);
  private metadataSubject = new BehaviorSubject<InventoryMetadata | undefined>(undefined)
  private specimensSubject = new BehaviorSubject<Specimen[]>([]);

  constructor() {
    const metadata: InventoryMetadata | undefined = this.localStorageService.getMetadataFromStorage();
    console.log(metadata);
    if(metadata) {
      const specimens = this.localStorageService.getSpecimensFromStorage();
      if(specimens) {
        this.logger.info("InventoryService", "Load inventory from storage")
        this.loadInventory(metadata, specimens);
      }
    }
  }

  public isInventoryLoaded(): Observable<boolean> {
    return this.inventoryLoadingState.asObservable();
  }

  public getMetadata(): Observable<InventoryMetadata | undefined> {
    return this.metadataSubject.asObservable();
  }

  public getColumns(): Observable<ColumnMetadata[]> {
    return this.metadataSubject.asObservable()
      .pipe(map(metadata => metadata?.columns ?? []));
  }

  public getSpecimens(): Observable<Specimen[]> {
    return this.specimensSubject.asObservable();
  }

  private loadInventory(metadata: InventoryMetadata, specimens: Specimen[]): void {
    this.metadataSubject.next(metadata);
    this.specimensSubject.next(specimens);
    this.inventoryLoadingState.next(true);
  }

  public loadNewInventory(metadata: InventoryMetadata, specimens: Specimen[]): void {
    this.logger.info("InventoryService", "Load new inventory");
    this.localStorageService.persistMetadata(metadata);
    this.localStorageService.persistSpecimens(specimens);
    this.loadInventory(metadata, specimens);
  }

  public triggerImportNewInventory(): void {
    this.inventoryLoadingState.next(false);
  }


}
