import {ChangeDetectionStrategy, Component, inject, input, Signal, signal} from '@angular/core';
import {TableModule} from 'primeng/table';
import {InventoryService} from '../../services/inventory.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {Checkbox} from 'primeng/checkbox';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'ltg-inventory-table',
  imports: [
    TableModule,
    Checkbox,
    FormsModule
  ],
  templateUrl: './inventory-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryTableComponent {

  private readonly inventoryService: InventoryService = inject(InventoryService);

  readonly columns = toSignal(this.inventoryService.getColumns(), {initialValue: []});
  readonly specimens = toSignal(this.inventoryService.getSpecimens(), {initialValue: []});
  readonly isAllSpecimensSelected = toSignal(this.inventoryService.isAllSpecimensSelected());

  public toogleSelect(id: number) {
    this.inventoryService.toogleSpecimenSelection(id);
  }

  public toogleAllSpecimens(): void {
    this.inventoryService.toogleAllSpecimen();
  }

}
