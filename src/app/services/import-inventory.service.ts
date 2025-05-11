import {inject, Injectable} from '@angular/core';
import {InventoryService} from './inventory.service';
import {DEMO_INVENTORY_METADATA, DEMO_INVENTORY_SPECIMENS} from './demo-inventory';
import {LoggerService} from './logger.service';
import {ModalService} from './modal.service';
import {BehaviorSubject, fromEvent, map, Observable, of} from 'rxjs';
import {Options, parse} from 'csv-parse/browser/esm/sync';
import {CsvImportParam} from '../model/csv-import-param';
import {ColumnMetadata} from '../model/column-metadata';
import {InventoryMetadata} from '../model/inventory-metadata';
import {Specimen} from '../model/specimen';
import {InventoryPreview} from '../model/inventory-preview';

@Injectable({
  providedIn: 'root'
})
export class ImportInventoryService {

  private logger: LoggerService = inject(LoggerService);
  private inventoryService: InventoryService = inject(InventoryService);
  private modalService: ModalService = inject(ModalService);

  private fileName: string | undefined;
  private readTextFile: string | undefined;
  private inventoryPreviewSubject = new BehaviorSubject<InventoryPreview | undefined>(undefined);

  public getColumnMetadataList(): Observable<InventoryPreview | undefined> {
    return this.inventoryPreviewSubject.asObservable();
  }


  public loadDemoInventory(): void {
    this.inventoryService.loadNewInventory(DEMO_INVENTORY_METADATA, DEMO_INVENTORY_SPECIMENS);
  }


  public openCsvFile(csvFile: File): Observable<void> {
    this.fileName = csvFile.name;

    this.logger.info("Open csv file");
    this.modalService.displayModal(
      {title: "Lecture fichier CSV", message: "Veuillez patientez pendant l'import du fichier", displaySpinner: true}
    );

    return this.readFile(csvFile).pipe(map(file => {
      this.readTextFile = file;
      console.log(file);
      this.modalService.hideModal();
    }));
  }

  public getOrUpdatePreview(params: CsvImportParam): void {


    if (!this.readTextFile) {
      this.inventoryPreviewSubject.next({columns: [], specimens: []});
      return;
    }

    let options: Options = {
      delimiter: params.separator,
    };

    let preview: InventoryPreview = {
      columns: [],
      specimens: [],
      isError: false
    };

    try {
      preview.columns = this.getColumnsHeaders(options, params.firstLineAsHeader);

      preview.specimens = parse(this.readTextFile, {
        ...options,
        columns: preview.columns.map(columnMetadata => columnMetadata.jsonName),
        from: params.firstLineAsHeader ? 2 : 1, // if the first line is header, begin the extract to second line (begin to 1 and not 0 with csv.js)
        to_line: params.firstLineAsHeader ? 6 : 5,
      });

    } catch (error) {
      this.logger.warn("Error during parsing csv file for preview, the parameters must not be right.");
      preview.isError = true;
    } finally {
      this.inventoryPreviewSubject.next(preview);
    }
  }

  public importCsvInventory(params: CsvImportParam): void {
    if (!this.fileName || !this.readTextFile) {
      console.error("Error csv file not read before call importation");
      this.modalService.displayModal({
        title: "Une erreur s'est produite durant l'import du fichier csv. Merci de recharger l'application et vérifier le fichier.",
        closable: false
      });
      return;
    }

    this.logger.info("Import csv file");
    this.modalService.displayModal(
      {title: "Import fichier CSV", message: "Veuillez patientez pendant l'import du fichier", displaySpinner: true}
    );

    let globalOptions: Options = {
      delimiter: params.separator,
    };

    try {
      const columnMetadataList: ColumnMetadata[] = this.getColumnsHeaders(globalOptions, params.firstLineAsHeader);

      // Todo import séquentiel?
      const listSpecimens = parse(this.readTextFile, {
        ...globalOptions,
        columns: columnMetadataList.map(columnMetadata => columnMetadata.jsonName),
        from: params.firstLineAsHeader ? 2 : 1 // if the first line is header, begin the extract to second line (begin to 1 and not 0 with csv.js)
      });

      console.log(columnMetadataList);
      console.log(listSpecimens);
      let i: number = 0;
      this.inventoryService.loadNewInventory(
        this.getInventoryMetadata(this.fileName, columnMetadataList),
        listSpecimens.map((values: Record<string, string>) => {
          return {id: i++, data: values} as Specimen;
        })
      );
      this.modalService.hideModal();
    } catch (error) {
      this.logger.errorWithError("Error during parsing csv file", error);
      this.modalService.displayModal({
        title: "Une erreur s'est produite durant l'import du fichier csv. Merci de vérifier le fichier et les options d'import.",
        closable: true
      });
    }
  }

  private readFile(textFile: File): Observable<string> {
    const reader = new FileReader();
    const readerLoadEnd = fromEvent(reader, 'loadend').pipe(map((event) => {
      console.log(event);
      this.logger.debug("Reading csv file ended");
      return reader.result as string;
    }));
    reader.readAsText(textFile);
    return readerLoadEnd;
  }

  private getColumnsHeaders(options: Options, firstLineAsHeader: boolean): ColumnMetadata[] {
    if (!this.readTextFile) {
      return [];
    }
    const lineHeaders = parse(this.readTextFile, {...options, to_line: 1});
    return lineHeaders[0].map((value: any, index: number) => {
      return new ColumnMetadata(index,
        firstLineAsHeader ? value : ("Column_" + (index + 1))
      );
    });
  }

  private getInventoryMetadata(fileName: string, columnsHeadersList: ColumnMetadata[]): InventoryMetadata {
    return new InventoryMetadata(fileName, columnsHeadersList);
  }

}
