import {inject, Injectable} from '@angular/core';
import {InventoryMetadata} from '../model/inventory-metadata';
import {KeysLocalStorage} from '../enums/local-storage-keys';
import {Specimen} from '../model/specimen';
import {LoggerService} from './logger.service';

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

  /**
   *@deprecated
   */
  public getMetadataFromStorage(): InventoryMetadata | undefined {
    const metadataLocalStorage = window.localStorage.getItem(KeysLocalStorage.inventoryMetadata);
    if (!metadataLocalStorage) {
      return undefined;
    }
    try {
      return InventoryMetadata.fromJson(metadataLocalStorage);
    } catch (e: any) {
      this.logger.errorWithError("Error during parsing inventory metadata from local storage", e);
      return undefined;
    }
  }

  /**
   *@deprecated
   */
  public persistMetadata(metadata: InventoryMetadata): void {
    this.logger.debug("Saving inventory metadata in local storage")
    window.localStorage.setItem(KeysLocalStorage.inventoryMetadata, JSON.stringify(metadata));
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
