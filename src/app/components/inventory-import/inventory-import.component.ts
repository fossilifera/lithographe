import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {Button, ButtonLabel} from 'primeng/button';
import {ImportInventoryService} from '../../services/import-inventory.service';
import {Card} from 'primeng/card';
import {FileSelectEvent, FileUpload} from 'primeng/fileupload';
import {Fieldset} from 'primeng/fieldset';
import {ToggleSwitch} from 'primeng/toggleswitch';
import {FormsModule} from '@angular/forms';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CsvImportParam} from '../../model/csv-import-param';

@Component({
  selector: 'inventory-import',
  imports: [
    ButtonLabel,
    Button,
    Card,
    FormsModule,
    FileUpload,
    Fieldset,
    ToggleSwitch,
    RadioButtonModule
  ],
  templateUrl: './inventory-import.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'view'}
})
export class InventoryImportComponent {

  private importInventoryService: ImportInventoryService = inject(ImportInventoryService);

  csvImportParams: CsvImportParam = {firstLineAsHeader: true, separator: ';'};

  importDemoInventory(): void {
    this.importInventoryService.loadDemoInventory();
  }

  importCsv(event: FileSelectEvent): void {
    this.importInventoryService.readCsvFileForImport(event.files[0], this.csvImportParams);
  }

}
