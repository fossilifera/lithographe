import {inject, Injectable, OnInit} from '@angular/core';
import {InventoryService} from './inventory.service';
import {DEMO_INVENTORY_COLUMNS, DEMO_INVENTORY_NAME, DEMO_INVENTORY_SPECIMENS} from './demo-inventory';
import {LoggerService} from '../shared/logger/logger.service';
import {BehaviorSubject, fromEvent, map, Observable} from 'rxjs';
import {Options, parse} from 'csv-parse/browser/esm/sync';
import {CsvImportParam} from './csv-import-param';
import {ColumnMetadata} from './column-metadata';
import {Specimen} from './specimen';
import {InventoryPreview} from './inventory-preview';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ImportInventoryService implements OnInit {

  private logger: LoggerService = inject(LoggerService);
  private inventoryService: InventoryService = inject(InventoryService);
  private readonly router = inject(Router);

  private fileName: string | undefined;
  private readTextFile: string | undefined;
  private inventoryPreviewSubject = new BehaviorSubject<InventoryPreview | undefined>(undefined);


  ngOnInit(): void {
  }


  public getColumnMetadataList(): Observable<InventoryPreview | undefined> {
    return this.inventoryPreviewSubject.asObservable();
  }

  public loadDemoInventory(): void {
    this.inventoryService.loadNewInventory(DEMO_INVENTORY_NAME, DEMO_INVENTORY_COLUMNS, DEMO_INVENTORY_SPECIMENS);
    this.router.navigate(['/inventory']);
  }

  public openCsvFile(csvFile: File): Observable<boolean> {
    this.logger.info("Open csv file");
    this.fileName = csvFile.name;
    return this.readFile(csvFile).pipe(map(file => {
      this.readTextFile = file;
      return true;
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
      this.logger.errorWithError("Error during parsing csv file for preview, the parameters must not be right.", error);
      preview.isError = true;
    } finally {
      this.inventoryPreviewSubject.next(preview);
    }
  }

  public importCsvInventory(params: CsvImportParam): boolean {
    if (!this.fileName || !this.readTextFile) {
      console.error("Error csv file not read before call importation");
      return false;
    }

    this.logger.info("Import csv file");
    let globalOptions: Options = {
      delimiter: params.separator,
    };

    try {
      const columnMetadataList: ColumnMetadata[] = this.getColumnsHeaders(globalOptions, params.firstLineAsHeader);

      const listSpecimens = parse(this.readTextFile, {
        ...globalOptions,
        columns: columnMetadataList.map(columnMetadata => columnMetadata.jsonName),
        from: params.firstLineAsHeader ? 2 : 1 // if the first line is header, begin the extract to second line (begin to 1 and not 0 with csv.js)
      });

      console.log(columnMetadataList);
      console.log(listSpecimens);
      let i: number = 0;
      this.inventoryService.loadNewInventory(
        this.fileName,
        columnMetadataList,
        listSpecimens.map((values: Record<string, string>) => {
          return {id: i++, selected: true, data: values} as Specimen;
        })
      );
    } catch (error) {
      this.logger.errorWithError("Error during parsing csv file", error);
      return false
    }
    return true;
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
      return {
        position: index,
        displayName: firstLineAsHeader ? value : "Column " + (index + 1),
        jsonName: firstLineAsHeader ? value : "col_" + (index + 1),
      } as ColumnMetadata;
    });
  }

}
