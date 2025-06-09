import {computed, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {Logger} from '../shared/logger/logger';
import {Specimen} from './specimen';
import {StorageService} from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private logger = new Logger('InventoryService');
  private storageService: StorageService = inject(StorageService);

  readonly specimens: WritableSignal<Specimen[]> = signal([]);

  readonly isInventoryLoaded: WritableSignal<boolean> = signal(false);
  readonly isAllSpecimensSelected = computed(() => this.specimens().every(specimen => specimen.selected));


  public getInventoryFileName(): string | null {
    return this.storageService.getInventoryFileName();
  }

  public isImportInventoryAvailableInStorage(): boolean {
    return this.getInventoryFileName() !== null;
  }


  private loadInventory(specimens: Specimen[]): void {
    this.specimens.set(specimens);
    this.isInventoryLoaded.set(true);
  }

  public loadInventoryFromStorage(): boolean {
    this.logger.info("Open inventory from storage");

    const specimens = this.storageService.getSpecimensFromStorage();
    if (!specimens) {
      this.logger.error("Error during load inventory from storage: specimens are null");
      return false;
    }
    this.loadInventory(specimens);
    return true;
  }

  public loadNewInventory(fileName: string, specimens: Specimen[]): void {
    this.logger.info("Load new inventory");
    this.loadInventory(specimens);
    this.storageService.persistInventoryFileName(fileName);
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
