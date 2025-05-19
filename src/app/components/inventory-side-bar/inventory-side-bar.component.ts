import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {Button} from 'primeng/button';
import {InventoryService} from '../../services/inventory.service';
import {Card} from 'primeng/card';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'ltg-inventory-side-bar',
  imports: [
    Button,
    Card
  ],
  templateUrl: './inventory-side-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventorySideBarComponent {

  private inventoryService: InventoryService = inject(InventoryService);
  protected inventoryMetadata = toSignal(this.inventoryService.getMetadata());
  protected creationDate = computed(() => this.inventoryMetadata()?.creationDate?.toLocaleDateString());

  newInventory(): void {
    this.inventoryService.triggerImportNewInventory();
  }

}
