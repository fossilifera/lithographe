import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {Button, ButtonLabel} from 'primeng/button';
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
import {StorageService} from '../../services/storage.service';

@Component({
  selector: 'inventory-import',
  imports: [
    ButtonLabel,
    Button,
    Card,
    FormsModule,
    FileUpload,
    ToggleSwitch,
    RadioButtonModule,
    InventoryImportPreviewComponent
  ],
  templateUrl: './inventory-import.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryImportComponent {

  private storageService: StorageService = inject(StorageService);
  private importInventoryService: ImportInventoryService = inject(ImportInventoryService);

  protected inventoryPreview = toSignal(this.importInventoryService.getColumnMetadataList());
  protected displayImportConfiguration = signal(false);
  csvImportParams: CsvImportParam = {firstLineAsHeader: true, separator: ';'};



  triggerCsvImport(event: FileSelectEvent): void {
    console.log("trigger csv import");
    this.importInventoryService.openCsvFile(event.files[0])
      .pipe(first())
      .subscribe(() => {
        this.displayImportConfiguration.set(true);
        // FIXME virer le timer
        setTimeout(() => {

          this.updateHeader();
        }, 1000);
      });
  }

  updateHeader(): void {
    console.log("TOTO");
    this.importInventoryService.getOrUpdatePreview(this.csvImportParams);

  }

  importCsv(): void {
    this.importInventoryService.importCsvInventory(this.csvImportParams);
  }

}
