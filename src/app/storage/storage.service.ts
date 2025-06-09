import {Injectable} from '@angular/core';
import {KeysLocalStorage} from './local-storage-keys';
import {Specimen} from '../inventory/specimen';
import {Logger} from '../shared/logger/logger';
import {CsvImportParam} from '../import/csv-import-param';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private logger: Logger = new Logger('StorageService');

  public getInventoryFileName(): string | null {
    return window.localStorage.getItem(KeysLocalStorage.inventoryFileName);
  }

  public persistInventoryFileName(fileName: string): void {
    this.logger.debug("Saving file name in local storage")
    window.localStorage.setItem(KeysLocalStorage.inventoryFileName, fileName);
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

  public getCsvImportParamsFromStorage(): CsvImportParam | undefined {
    const paramsStorage = window.localStorage.getItem(KeysLocalStorage.csvImportParams);
    if (!paramsStorage) {
      return undefined;
    }
    try {
      return JSON.parse(paramsStorage) as CsvImportParam;
    } catch (e) {
      this.logger.errorWithError("Error during parsing csvImportParams from local storage", e);
      return undefined;
    }
  }

  public persistCsvImportParams(params: CsvImportParam): void {
    this.logger.debug("Saving csv import params in local storage");
    window.localStorage.setItem(KeysLocalStorage.csvImportParams, JSON.stringify(params));
  }

  public deleteAllData(): void {
    this.logger.info("Clear local storage");
    window.localStorage.clear();
  }
}
