import {inject, Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, map, Observable, of} from 'rxjs';
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
  private specimens: Specimen[] = [];
  private selectionSubject = new BehaviorSubject<number[]>([]);

  constructor() {
    const metadata: InventoryMetadata | undefined = this.storageService.getMetadataFromStorage();
    if (metadata) {
      const specimens = this.storageService.getSpecimensFromStorage();
      if (specimens) {
        this.logger.info("Load inventory from storage")
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

  public getSpecimens(): Specimen[] {
    return this.specimens;
  }

  public getSpecimenById(id: number): Specimen | undefined {
    return this.specimens.find(specimen => specimen.id === id);
  }

  /**
   * @deprecated
   */
  public getSpecimenByIdObs(id: number): Observable<Specimen | undefined> {
    // FIXME
    return of(this.specimens.find(specimen => specimen.id === id));
  }

  public getSpeciemenSelectedIds(): Observable<number[]> {
    return this.selectionSubject.asObservable();
  }

  public getSpeciemenSelectedIdsSync(): number[] {
    return this.selectionSubject.getValue();
  }

  private loadInventory(metadata: InventoryMetadata, specimens: Specimen[]): void {
    this.metadataSubject.next(metadata);
    this.specimens = specimens;
    this.selectAllSpecimens();
    this.inventoryLoadingState.next(true);
  }

  public loadNewInventory(metadata: InventoryMetadata, specimens: Specimen[]): void {
    this.logger.info("Load new inventory");
    this.storageService.persistMetadata(metadata);
    this.storageService.persistSpecimens(specimens);
    this.loadInventory(metadata, specimens);
  }

  public triggerImportNewInventory(): void {
    this.inventoryLoadingState.next(false);
  }

  public toggleSpecimenSelection(id: number): void {
    this.logger.debug(`Toggle selection for id ${id}`);
    if (this.selectionSubject.getValue().includes(id)) {
      this.selectionSubject.next(this.selectionSubject.getValue().filter((value: number) => value !== id));
    } else {
      this.selectionSubject.next(this.selectionSubject.getValue().concat(id))
    }
  }

  public toggleAllSpecimen(): void {
    if (this.specimens.length === this.selectionSubject.getValue().length) {
      this.logger.debug('Unselect all specimens');
      this.selectionSubject.next([]);
    } else {
      this.logger.debug('Select all specimens');
      this.selectAllSpecimens();
    }
  }

  public resetData(): void {
    this.inventoryLoadingState.next(false);
    this.metadataSubject.next(undefined);
    this.specimens = [];
    this.selectionSubject.next([]);
  }

  private selectAllSpecimens(): void {
    this.selectionSubject.next(
      this.specimens.map((specimen: Specimen) => specimen.id)
    );
  }

}
