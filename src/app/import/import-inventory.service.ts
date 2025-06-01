import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {InventoryService} from '../inventory/inventory.service';
import {DEMO_INVENTORY_NAME, DEMO_INVENTORY_SPECIMENS} from '../inventory/demo-inventory';
import {LoggerService} from '../shared/logger/logger.service';
import {fromEvent, map, Observable} from 'rxjs';
import {Options, parse} from 'csv-parse/browser/esm/sync';
import {CsvImportParam} from './csv-import-param';
import {TablePreview} from './table-preview';
import {Router} from '@angular/router';
import {TableColumn} from './table-column';
import {SpecimenMapperService} from './specimen-mapper.service';

@Injectable({
  providedIn: 'root'
})
export class ImportInventoryService {

  private logger: LoggerService = inject(LoggerService);
  private inventoryService: InventoryService = inject(InventoryService);
  private specimenMapper: SpecimenMapperService = inject(SpecimenMapperService);
  private readonly router = inject(Router);

  private fileName: string | undefined;
  private readTextFile: string | undefined;
  readonly inventoryPreview: WritableSignal<TablePreview> = signal({
    columns: [],
    data: [],
    isLoaded: false
  } as TablePreview);


  public loadDemoInventory(): void {
    this.inventoryService.loadNewInventory(DEMO_INVENTORY_NAME, DEMO_INVENTORY_SPECIMENS);
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
      this.inventoryPreview.set({columns: [], data: [], isLoaded: false});
      return;
    }

    let preview: TablePreview = {
      columns: [],
      data: [],
      isError: false,
      isLoaded: true
    };

    try {
      preview.columns = this.getColumns(params);
      preview.data = parse(this.readTextFile, {
        ...this.csvImportParamsToOptions(params),
        from: params.firstLineAsHeader ? 2 : 1, // if the first line is header, begin the extract to second line (begin to 1 and not 0 with csv.js)
        to_line: params.firstLineAsHeader ? 6 : 5,
      });
    } catch (error) {
      this.logger.errorWithError("Error during parsing csv file for preview, the parameters must not be right.", error);
      preview.isError = true;
    } finally {
      this.inventoryPreview.set(preview);
    }
  }

  public importCsvInventory(params: CsvImportParam): boolean {
    if (!this.fileName || !this.readTextFile) {
      console.error("Error csv file not read before call importation");
      return false;
    }

    this.logger.info("Import csv file");

    try {
      const listSpecimens = parse(this.readTextFile, {
        ...this.csvImportParamsToOptions(params),
        from: params.firstLineAsHeader ? 2 : 1 // if the first line is header, begin the extract to second line (begin to 1 and not 0 with csv.js)
      });
      // FIXME faire une passe sur tous les console log
      console.log(listSpecimens);
      this.inventoryService.loadNewInventory(
        this.fileName,
        listSpecimens.map((data: Record<string, string>, i: number) =>
          this.specimenMapper.toSpecimen(data, i, params.columnsMapping)
        )
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

  private getColumns(params: CsvImportParam): TableColumn[] {
    if (!this.readTextFile) {
      this.logger.warn("Try to get columns before read csv file");
      return [];
    }
    const lineHeaders = parse(this.readTextFile, {...this.csvImportParamsToOptions(params), to_line: 1});
    return lineHeaders[0].map((value: string, i: number): TableColumn => {
        return {
          index: i,
          name: params.firstLineAsHeader ? value : "Colonne " + (i + 1)
        };
      }
    );
  }

  private csvImportParamsToOptions(params: CsvImportParam): Options {
    return {
      delimiter: params.separator,
    } as Options;
  }

}
