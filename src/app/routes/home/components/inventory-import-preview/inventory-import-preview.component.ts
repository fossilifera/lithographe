import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {TableModule} from 'primeng/table';
import {Message} from 'primeng/message';
import {Skeleton} from 'primeng/skeleton';
import {InventoryPreview} from '../../../../inventory/inventory-preview';

@Component({
  selector: 'ltg-inventory-import-preview',
  imports: [
    TableModule,
    Message,
    Skeleton
  ],
  templateUrl: './inventory-import-preview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryImportPreviewComponent {

  inventoryPreview = input<InventoryPreview | undefined>(undefined)
  protected columns = computed(() => this.inventoryPreview()?.columns ?? []);
  protected specimens = computed(() => this.inventoryPreview()?.specimens ?? []);

}
