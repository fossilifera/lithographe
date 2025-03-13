import {inject, Injectable} from '@angular/core';
import {InventoryService} from './inventory.service';
import {DEMO_INVENTORY_METADATA, DEMO_INVENTORY_SPECIMENS} from './demo-inventory';
import {LoggerService} from './logger.service';
import {ModalService} from './modal.service';
import {fromEvent, map, Observable} from 'rxjs';
import {Options, parse} from 'csv-parse/browser/esm/sync';
import {CsvImportParam} from '../model/csv-import-param';
import {ColumnMetadata} from '../model/column-metadata';
import {InventoryMetadata} from '../model/inventory-metadata';
import {Specimen} from '../model/specimen';

@Injectable({
  providedIn: 'root'
})
export class ImportInventoryService {

  private logger: LoggerService = inject(LoggerService);
  private inventoryService: InventoryService = inject(InventoryService);
  private modalService: ModalService = inject(ModalService);

  public loadDemoInventory(): void {
    this.inventoryService.loadNewInventory(DEMO_INVENTORY_METADATA, DEMO_INVENTORY_SPECIMENS);
  }

  public readCsvFileForImport(csvFile: File, params: CsvImportParam): void {
    const fileName: string = csvFile.name;
    let globalOptions: Options = {
      delimiter: params.separator,
    };

    this.logger.info("ImportInventoryService", "Import csv file");
    this.modalService.displayModal(
      {title: "Import fichier CSV", message: "Veuillez patientez pendant l'import du fichier", displaySpinner: true}
    );
    this.readFile(csvFile).pipe(map(readTextFile => {
      const columnMetadataList: ColumnMetadata[] = this.getColumnsHeaders(readTextFile, globalOptions, params.firstLineAsHeader);
      //FIXME
      console.log(columnMetadataList);
      const listSpecimens = parse(readTextFile, {
        ...globalOptions,
        columns: columnMetadataList.map(columnMetadata => columnMetadata.jsonName),
        from: params.firstLineAsHeader ? 2 : 1 // if the first line is header, begin the extract to second line (begin to 1 and not 0 with csv.js)
      });
      return {columnMetadataList, listSpecimens};
    })).subscribe({
      next: ({columnMetadataList, listSpecimens}) => {
        console.log(columnMetadataList);
        console.log(listSpecimens);
        let i: number = 0;
        this.inventoryService.loadNewInventory(
          this.getInventoryMetadata(fileName, columnMetadataList),
          listSpecimens.map((values: Record<string, string>) => {
            return {id: i++, data: values} as Specimen;
          })
        );
        this.modalService.hideModal();
      },
      error: err => {
        // TODO gestion erreur
        this.logger.errorWithError("ImportInventoryService", "Error during parsing csv file", err);
      }
    });
  }

  private readFile(textFile: File): Observable<string> {
    const reader = new FileReader();
    const readerLoadEnd = fromEvent(reader, 'loadend').pipe(map((event) => {
      console.log(event);
      this.logger.debug("ImportInventoryService", "Reading csv file ended");
      return reader.result as string;
    }));
    reader.readAsText(textFile);
    return readerLoadEnd;
  }

  private getColumnsHeaders(readInput: string, options: Options, firstLineAsHeader: boolean): ColumnMetadata[] {
    const lineHeaders = parse(readInput, {...options, to_line: 1});
    let i = 0;

    return lineHeaders[0].map((value: any) => {
      return new ColumnMetadata(i++,
        firstLineAsHeader ? value : ("Column_" + i)
      );
    });
  }

  private getInventoryMetadata(fileName: string, columnsHeadersList: ColumnMetadata[]): InventoryMetadata {
    return new InventoryMetadata(fileName, columnsHeadersList);
  }

}
