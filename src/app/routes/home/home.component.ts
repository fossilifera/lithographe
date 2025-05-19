import { ChangeDetectionStrategy, Component } from '@angular/core';
import {InventoryImportComponent} from '../../components/inventory-import/inventory-import.component';
import {Fieldset} from 'primeng/fieldset';

@Component({
  selector: 'ltg-home-view',
  imports: [
    InventoryImportComponent,
    Fieldset
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'view'}
})
export class HomeComponent {

}
