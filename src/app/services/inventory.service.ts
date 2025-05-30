import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {LoggerService} from './logger.service';
import {InventoryMetadata} from '../model/inventory-metadata';
import {Specimen} from '../model/specimen';
import {ColumnMetadata} from '../model/column-metadata';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private logger: LoggerService = inject(LoggerService);
  private storageService: StorageService = inject(StorageService);

  private inventoryLoadingState = new BehaviorSubject<boolean>(false);
  // FIXME à retirer
  private metadataSubject = new BehaviorSubject<InventoryMetadata | undefined>(undefined)

  private specimens: Specimen[] = [];
  private selectionSubject = new BehaviorSubject<number[]>([]);


  public isInventoryLoaded(): Observable<boolean> {
    return this.inventoryLoadingState.asObservable();
  }


  public getInventoryFileName(): string | null {
    return this.storageService.getInventoryFileName();
  }

  public isImportInventoryAvailableInStorage(): boolean {
    return this.getInventoryFileName() !== null;
  }

  /**
   *@deprecated
   */
  public getMetadata(): Observable<InventoryMetadata | undefined> {
    return this.metadataSubject.asObservable();
  }

  public getColumns(): Observable<ColumnMetadata[]> {
    return this.metadataSubject.asObservable()
      .pipe(map(metadata => metadata?.columns ?? []));
  }

  public getInventorySize(): number {
    return this.specimens.length;
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
  public getSpeciemenSelectedIds(): Observable<number[]> {
    // TODO enlever
    return this.selectionSubject.asObservable();
  }

  public getSpeciemenSelectedIdsSync(): number[] {
    return this.selectionSubject.getValue();
  }

  private loadInventory(metadata: InventoryMetadata, specimens: Specimen[]): void {
    // FIXME virer metadata
    this.metadataSubject.next(metadata);
    this.specimens = specimens;
    this.selectAllSpecimens();
    this.inventoryLoadingState.next(true);
  }

  public loadInventoryFromStorage(): boolean {
    this.logger.info("Open inventory from storage");
    const metadata: InventoryMetadata | undefined = this.storageService.getMetadataFromStorage();
    // FIXME revoir gestion erreurs
    if (metadata) {
      const specimens = this.storageService.getSpecimensFromStorage();
      if (specimens) {
        this.loadInventory(metadata, specimens);
        return true;
      }
    }
    return false;
  }

  public loadNewInventory(fileName: string, columns: ColumnMetadata[], specimens: Specimen[]): void {
    this.logger.info("Load new inventory");
    this.loadInventory(new InventoryMetadata(fileName, columns), specimens);
    this.storageService.persistInventoryFileName(fileName);
    this.storageService.persistMetadata(new InventoryMetadata(fileName, columns));
    this.storageService.persistSpecimens(specimens);
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
