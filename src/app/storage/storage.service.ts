import {inject, Injectable} from '@angular/core';
import {KeysLocalStorage} from './local-storage-keys';
import {Specimen} from '../inventory/specimen';
import {LoggerService} from '../shared/logger/logger.service';
import {ColumnMetadata} from '../inventory/column-metadata';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private logger: LoggerService = inject(LoggerService);

  public getInventoryFileName(): string | null {
      return window.localStorage.getItem(KeysLocalStorage.inventoryFileName);
  }

  public persistInventoryFileName(fileName: string): void {
    this.logger.debug("Saving file name in local storage")
    window.localStorage.setItem(KeysLocalStorage.inventoryFileName, fileName);
  }


  public getColumnMetadata(): ColumnMetadata[] | null {
    const columnsInStorage = window.localStorage.getItem(KeysLocalStorage.inventoryColumns);
    if(!columnsInStorage) {
      return null;
    }
    try {
      return JSON.parse(columnsInStorage) as ColumnMetadata[];
    } catch (e) {
      this.logger.errorWithError("Error during parsing columns from local storage", e);
      return null;
    }
  }

  public persistColumns(columns: ColumnMetadata[]): void {
    this.logger.debug("Saving columns metadata in local storage")
    window.localStorage.setItem(KeysLocalStorage.inventoryColumns, JSON.stringify(columns));
  }

  public getSpecimensFromStorage(): Specimen[] | undefined {
    const specimenLocalStorage = window.localStorage.getItem(KeysLocalStorage.inventorySpecimens);
    if (!specimenLocalStorage) {
      return undefined;
    }
    try {
      return JSON.parse(specimenLocalStorage) as Specimen[];
    } catch (e) {
      this.logger.errorWithError("Error during parsing specimens from local storage", e);
      return undefined;
    }
  }

  public persistSpecimens(specimens: Specimen[]): void {
    this.logger.debug("Saving inventory specimens in local storage");
    window.localStorage.setItem(KeysLocalStorage.inventorySpecimens, JSON.stringify(specimens));
  }

  public deleteAllData(): void {
    this.logger.info("Clear local storage");
    window.localStorage.clear();
  }
}
