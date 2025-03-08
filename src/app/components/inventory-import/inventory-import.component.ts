import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Button, ButtonLabel} from 'primeng/button';
import {ImportInventoryService} from '../../services/import-inventory.service';

@Component({
  selector: 'ltg-inventory-import',
  imports: [
    ButtonLabel,
    Button
  ],
  templateUrl: './inventory-import.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryImportComponent {

  private importInventoryService: ImportInventoryService = inject(ImportInventoryService);

  importDemoInventory(): void {
    this.importInventoryService.loadDemoInventory();
  }

}
