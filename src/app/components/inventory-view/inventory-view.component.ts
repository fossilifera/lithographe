import { ChangeDetectionStrategy, Component } from '@angular/core';
import {InventorySideBarComponent} from '../inventory-side-bar/inventory-side-bar.component';
import {InventoryTableComponent} from '../inventory-table/inventory-table.component';

@Component({
  selector: 'ltg-inventory-view',
  imports: [
    InventorySideBarComponent,
    InventoryTableComponent
  ],
  templateUrl: './inventory-view.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'view'}
})
export class InventoryViewComponent {

}
