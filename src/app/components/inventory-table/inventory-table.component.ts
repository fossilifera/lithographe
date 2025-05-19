import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {TableModule} from 'primeng/table';
import {InventoryService} from '../../services/inventory.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {Checkbox} from 'primeng/checkbox';
import {FormsModule} from '@angular/forms';
import {Specimen} from '../../model/specimen';

@Component({
  selector: 'inventory-table',
  imports: [
    TableModule,
    Checkbox,
    FormsModule,
  ],
  templateUrl: './inventory-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryTableComponent {

  protected readonly inventoryService: InventoryService = inject(InventoryService);

  readonly columns = toSignal(this.inventoryService.getColumns(), {initialValue: []});
  readonly specimens: Specimen[] = this.inventoryService.getSpecimens();
  readonly selectedSpecimens = toSignal(this.inventoryService.getSpeciemenSelectedIds(), {initialValue: []});
  readonly isAllSpecimensSelected = computed(() => this.inventoryService.getInventorySize() === this.selectedSpecimens().length);

  public toggleSelect(id: number) {
    this.inventoryService.toggleSpecimenSelection(id);
  }

  public toggleAllSpecimens(): void {
    this.inventoryService.toggleAllSpecimen();
  }

}
