import {ChangeDetectionStrategy, Component, input} from '@angular/core';
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

  inventoryPreview = input<InventoryPreview>({columns: [], data: [], isLoaded: false});

}
