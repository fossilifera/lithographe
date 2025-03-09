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

  constructor() {
    const metadata: InventoryMetadata | undefined = this.getMetadataFromStorage();
    if(metadata) {
      const specimens = this.getSpecimensFromStorage();
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
    this.persistMetadata(metadata);
    this.persistSpecimens(specimens);
    this.loadInventory(metadata, specimens);
  }

  public triggerImportNewInventory(): void {
    this.inventoryLoadingState.next(false);
  }

  private getMetadataFromStorage(): InventoryMetadata | undefined {
    const metadataLocalStorage = window.localStorage.getItem(KeysLocalStorage.inventoryMetadata);
    if (!metadataLocalStorage) {
      return undefined;
    }
    try {
      return JSON.parse(metadataLocalStorage) as InventoryMetadata;
    } catch (e: any) {
      this.logger.errorWithError("InventoryService", "Error during parsing inventory metadata from local storage", e);
      return undefined;
    }
  }

  private persistMetadata(metadata: InventoryMetadata): void {
    this.logger.debug("InventoryService", "Saving inventory metadata in local storage")
    window.localStorage.setItem(KeysLocalStorage.inventoryMetadata, JSON.stringify(metadata));
  }

  private getSpecimensFromStorage(): Specimen[] | undefined {
    const specimenLocalStorage = window.localStorage.getItem(KeysLocalStorage.inventorySpecimens);
    if(!specimenLocalStorage){
      return undefined;
    }
    try {
      return JSON.parse(specimenLocalStorage) as Specimen[];
    } catch (e) {
      this.logger.errorWithError("InventoryService", "Error during parsing specimens from local storage", e);
      return undefined;
    }
  }

  private persistSpecimens(specimens: Specimen[]): void {
    this.logger.debug("InventoryService", "Saving inventory specimens in local storage")
    window.localStorage.setItem(KeysLocalStorage.inventorySpecimens, JSON.stringify(specimens));
  }

}
