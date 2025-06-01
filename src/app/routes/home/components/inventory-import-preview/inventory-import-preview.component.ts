import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {TableModule} from 'primeng/table';
import {Message} from 'primeng/message';
import {Skeleton} from 'primeng/skeleton';
import {TablePreview} from '../../../../import/table-preview';

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

  inventoryPreview = input<TablePreview>({columns: [], data: [], isLoaded: false});

}
