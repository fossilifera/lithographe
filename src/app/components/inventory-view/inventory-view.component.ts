import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
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
  private readonly inventoryService: InventoryService = inject(InventoryService);
  protected isInventoryLoaded: Signal<boolean> = toSignal(this.inventoryService.isInventoryLoaded(), {requireSync: true});

}
