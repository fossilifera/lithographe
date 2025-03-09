import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Button, ButtonLabel} from 'primeng/button';
import {ImportInventoryService} from '../../services/import-inventory.service';
import {Card} from 'primeng/card';
import {FileSelectEvent, FileUpload} from 'primeng/fileupload';

@Component({
  selector: 'ltg-inventory-import',
  imports: [
    ButtonLabel,
    Button,
    Card,
    FileUpload
  ],
  templateUrl: './inventory-import.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'view'}
})
export class InventoryImportComponent {

  private importInventoryService: ImportInventoryService = inject(ImportInventoryService);

  importDemoInventory(): void {
    this.importInventoryService.loadDemoInventory();
  }

  importCsv(event: FileSelectEvent): void {
    console.dir(event.files);
    const reader = new FileReader()
    reader.addEventListener("loadend", () => {
      let text = reader.result;
      console.log(text);
    })
    reader.readAsText(event.files[0]);


  }

}
