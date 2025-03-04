import {ChangeDetectionStrategy, Component, Signal} from '@angular/core';
import {InventorySideBarComponent} from '../inventory-side-bar/inventory-side-bar.component';
import {InventoryTableComponent} from '../inventory-table/inventory-table.component';
import {InventoryService} from '../../services/inventory.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {InventoryImportComponent} from '../inventory-import/inventory-import.component';

@Component({
  selector: 'ltg-inventory-view',
  imports: [
    InventorySideBarComponent,
    InventoryTableComponent,
    InventoryImportComponent
  ],
  templateUrl: './inventory-view.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryViewComponent {
  protected isInventoryLoaded: Signal<boolean>;

  constructor(private readonly inventoryService: InventoryService) {
    this.isInventoryLoaded = toSignal(this.inventoryService.isInventoryLoaded(), {requireSync: true});
  }
}
