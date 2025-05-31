import {computed, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {LoggerService} from '../shared/logger/logger.service';
import {Specimen} from './specimen';
import {ColumnMetadata} from './column-metadata';
import {StorageService} from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private logger: LoggerService = inject(LoggerService);
  private storageService: StorageService = inject(StorageService);

  private columns: ColumnMetadata[] = [];
  readonly specimens: WritableSignal<Specimen[]> = signal([]);

  readonly isInventoryLoaded: WritableSignal<boolean> = signal(false);
  readonly isAllSpecimensSelected = computed(() => this.specimens().every(specimen => specimen.selected));


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
    return this.specimens().length;
  }


  public getSpecimenById(id: number): Specimen | undefined {
    return this.specimens().find(specimen => specimen.id === id);
  }

  private loadInventory(columns: ColumnMetadata[], specimens: Specimen[]): void {
    this.columns = columns;
    this.specimens.set(specimens);
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
    this.specimens.update(specimens =>
      specimens.map(specimen => {
        if (specimen.id === id) {
          specimen.selected = !specimen.selected;
        }
        return specimen;
      })
    );
  }

  public toggleAllSpecimen(): void {
    const boolTarget: boolean = !this.isAllSpecimensSelected();
      this.specimens.update(specimens => specimens.map(specimen => {
        specimen.selected = boolTarget;
        return specimen;
      }))
  }


}
