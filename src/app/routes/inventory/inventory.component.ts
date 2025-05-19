import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {InventorySideBarComponent} from '../../components/inventory-side-bar/inventory-side-bar.component';
import {InventoryTableComponent} from '../../components/inventory-table/inventory-table.component';
import {InventoryService} from '../../services/inventory.service';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'ltg-inventory-view',
  imports: [
    InventorySideBarComponent,
    InventoryTableComponent,
  ],
  templateUrl: './inventory.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryComponent {
  private readonly inventoryService: InventoryService = inject(InventoryService);
  protected isInventoryLoaded: Signal<boolean> = toSignal(this.inventoryService.isInventoryLoaded(), {requireSync: true});
}
