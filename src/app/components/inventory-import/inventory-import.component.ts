import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ButtonDirective, ButtonLabel} from 'primeng/button';

@Component({
  selector: 'ltg-inventory-import',
  imports: [
    ButtonDirective,
    ButtonLabel
  ],
  templateUrl: './inventory-import.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryImportComponent {


}
