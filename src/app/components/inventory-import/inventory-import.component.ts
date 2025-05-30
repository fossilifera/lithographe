import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {Button} from 'primeng/button';
import {ImportInventoryService} from '../../services/import-inventory.service';
import {Card} from 'primeng/card';
import {FileSelectEvent, FileUpload} from 'primeng/fileupload';
import {ToggleSwitch} from 'primeng/toggleswitch';
import {FormsModule} from '@angular/forms';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CsvImportParam} from '../../model/csv-import-param';
import { first} from 'rxjs';
import {InventoryImportPreviewComponent} from '../inventory-import-preview/inventory-import-preview.component';
import {toSignal} from '@angular/core/rxjs-interop';
import {Divider} from 'primeng/divider';
import {InventoryService} from '../../services/inventory.service';

@Component({
  selector: 'inventory-import',
  imports: [
    Button,
    Card,
    FormsModule,
    FileUpload,
    ToggleSwitch,
    RadioButtonModule,
    InventoryImportPreviewComponent,
    Divider
  ],
  templateUrl: './inventory-import.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryImportComponent {

  protected readonly importInventoryService: ImportInventoryService = inject(ImportInventoryService);
  protected readonly inventoryService: InventoryService = inject(InventoryService);


  protected inventoryPreview = toSignal(this.importInventoryService.getColumnMetadataList());
  protected displayImportConfiguration = signal(false);
  csvImportParams: CsvImportParam = {firstLineAsHeader: true, separator: ';'};

  openStoredInventory(): void {
    this.inventoryService.loadInventoryFromStorage();
  }

  triggerCsvImport(event: FileSelectEvent): void {
    console.log("trigger csv import");
    this.importInventoryService.openCsvFile(event.files[0])
      .pipe(first())
      .subscribe(() => {
        this.displayImportConfiguration.set(true);
        // FIXME virer le timer
        setTimeout(() => {

          this.updatePreview();
        }, 1000);
      });
  }

  updatePreview(): void {
    console.log("TOTO");
    this.importInventoryService.getOrUpdatePreview(this.csvImportParams);

  }

  importCsv(): void {
    this.importInventoryService.importCsvInventory(this.csvImportParams);
  }

}
