import {ChangeDetectionStrategy, Component, computed, inject, Signal} from '@angular/core';
import {InventoryService} from '../../services/inventory.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {Checkbox} from 'primeng/checkbox';
import {TableModule} from 'primeng/table';
import {FormsModule} from '@angular/forms';
import {Specimen} from '../../model/specimen';

@Component({
  selector: 'ltg-inventory-view',
  imports: [
    Checkbox,
    FormsModule,
    TableModule,
  ],
  templateUrl: './inventory.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryComponent {
  private readonly inventoryService: InventoryService = inject(InventoryService);

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

  // FIXME toujours utile?
  protected isInventoryLoaded: Signal<boolean> = toSignal(this.inventoryService.isInventoryLoaded(), {requireSync: true});
}
