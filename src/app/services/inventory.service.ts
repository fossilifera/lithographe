import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {LoggerService} from './logger.service';
import {Specimen} from '../model/specimen';
import {ColumnMetadata} from '../model/column-metadata';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private logger: LoggerService = inject(LoggerService);
  private storageService: StorageService = inject(StorageService);

  private columns: ColumnMetadata[] = [];
  private specimens: Specimen[] = [];
  private selectionSubject = new BehaviorSubject<number[]>([]);

  readonly isInventoryLoaded: WritableSignal<boolean> = signal(false);

  public getInventoryFileName(): string | null {
    return this.storageService.getInventoryFileName();
  }

  public isImportInventoryAvailableInStorage(): boolean {
    return this.getInventoryFileName() !== null;
  }

  public getColumns(): ColumnMetadata[] {
    return this.columns;
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

  private loadInventory(columns: ColumnMetadata[], specimens: Specimen[]): void {
    this.columns = columns;
    this.specimens = specimens;
    this.selectAllSpecimens();
    this.isInventoryLoaded.set(true);
  }

  public loadInventoryFromStorage(): boolean {
    this.logger.info("Open inventory from storage");
    const columns: ColumnMetadata[] | null = this.storageService.getColumnMetadata();
    // FIXME revoir gestion erreurs

    if (columns) {
      const specimens = this.storageService.getSpecimensFromStorage();
      if (specimens) {
        this.loadInventory(columns, specimens);
        return true;
      }
    }
    return false;
  }

  public loadNewInventory(fileName: string, columns: ColumnMetadata[], specimens: Specimen[]): void {
    this.logger.info("Load new inventory");
    this.loadInventory(columns, specimens);
    this.storageService.persistInventoryFileName(fileName);
    this.storageService.persistColumns(columns);
    this.storageService.persistSpecimens(specimens);
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

  private selectAllSpecimens(): void {
    this.selectionSubject.next(
      this.specimens.map((specimen: Specimen) => specimen.id)
    );
  }

}
