import { ChangeDetectionStrategy, Component } from '@angular/core';
import {InventoryImportComponent} from '../../components/inventory-import/inventory-import.component';

@Component({
  selector: 'ltg-home-view',
  imports: [
    InventoryImportComponent
  ],
  templateUrl: './home.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}
