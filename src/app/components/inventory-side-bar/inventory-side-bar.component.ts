import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {Button} from 'primeng/button';
import {InventoryService} from '../../services/inventory.service';
import {Card} from 'primeng/card';
import {toSignal} from '@angular/core/rxjs-interop';
import {VariablesMapperService} from '../../services/variables-mapper.service';
import {map} from 'rxjs';
import {Message} from 'primeng/message';
import {Tag} from 'primeng/tag';

@Component({
  selector: 'ltg-inventory-side-bar',
  imports: [
    Button,
    Card,
    Message,
    Tag
  ],
  templateUrl: './inventory-side-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventorySideBarComponent {

  private inventoryService: InventoryService = inject(InventoryService);
  private readonly variablesMapperService: VariablesMapperService = inject(VariablesMapperService);
  protected inventoryMetadata = toSignal(this.inventoryService.getMetadata());
  protected creationDate = computed(() => this.inventoryMetadata()?.creationDate?.toLocaleDateString());

  readonly listOfVariablesNotMapped = toSignal(this.variablesMapperService.getUnmappedVariables(), {initialValue: []});
  readonly isAllVariablesAreMapped = computed(() => this.listOfVariablesNotMapped().length === 0);

  newInventory(): void {
    this.inventoryService.triggerImportNewInventory();
  }

}
