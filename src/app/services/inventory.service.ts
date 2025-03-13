import {inject, Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {LoggerService} from './logger.service';
import {InventoryMetadata} from '../model/inventory-metadata';
import {Specimen} from '../model/specimen';
import {ColumnMetadata} from '../model/column-metadata';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService implements OnInit {

  private logger: LoggerService = inject(LoggerService);
  private storageService: StorageService = inject(StorageService);

  private inventoryLoadingState = new BehaviorSubject<boolean>(false);
  private metadataSubject = new BehaviorSubject<InventoryMetadata | undefined>(undefined)
  private specimensSubject = new BehaviorSubject<Specimen[]>([]);

  constructor() {
    const metadata: InventoryMetadata | undefined = this.storageService.getMetadataFromStorage();
    if(metadata) {
      const specimens = this.storageService.getSpecimensFromStorage();
      if(specimens) {
        this.logger.info("InventoryService", "Load inventory from storage")
        this.loadInventory(metadata, specimens);
      }
    }
  }

  ngOnInit(): void {
        throw new Error('Method not implemented.');
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
    this.storageService.persistMetadata(metadata);
    this.storageService.persistSpecimens(specimens);
    this.loadInventory(metadata, specimens);
  }

  public triggerImportNewInventory(): void {
    this.inventoryLoadingState.next(false);
  }


}
