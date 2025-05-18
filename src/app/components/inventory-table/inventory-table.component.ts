import {ChangeDetectionStrategy, Component, computed, inject, signal, ViewChild, WritableSignal} from '@angular/core';
import {TableModule} from 'primeng/table';
import {InventoryService} from '../../services/inventory.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {Checkbox} from 'primeng/checkbox';
import {FormsModule} from '@angular/forms';
import {VariablesMapperService} from '../../services/variables-mapper.service';
import {Tag} from 'primeng/tag';
import {Button, ButtonLabel} from 'primeng/button';
import {Popover} from 'primeng/popover';
import {ColumnMetadata} from '../../model/column-metadata';
import {Specimen} from '../../model/specimen';

@Component({
  selector: 'inventory-table',
  imports: [
    TableModule,
    Checkbox,
    FormsModule,
    Tag,
    Button,
    Popover,
    ButtonLabel
  ],
  templateUrl: './inventory-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryTableComponent {

  protected readonly inventoryService: InventoryService = inject(InventoryService);
  private readonly variablesMapperService: VariablesMapperService = inject(VariablesMapperService);

  @ViewChild('op') op!: Popover;

  readonly columns = toSignal(this.inventoryService.getColumns(), {initialValue: []});
  readonly specimens: Specimen[] = this.inventoryService.getSpecimens();
  readonly selectedSpecimens = toSignal(this.inventoryService.getSpeciemenSelectedIds(), {initialValue: []});
  readonly isAllSpecimensSelected = computed(() => this.inventoryService.getInventorySize() === this.selectedSpecimens().length);
  readonly listOfVariables = toSignal(this.variablesMapperService.getAllVariables(), {initialValue: []});
  readonly columnAssignationMap = toSignal(this.variablesMapperService.getColumnsAssignation(), {initialValue: new Map<string, string>});
  readonly listOfVariablesNotMapped = toSignal(this.variablesMapperService.getUnmappedVariables(), {initialValue: []});

  protected openMenuColumn: ColumnMetadata | undefined = undefined;

  public toggleSelect(id: number) {
    this.inventoryService.toggleSpecimenSelection(id);
  }

  public toggleAllSpecimens(): void {
    this.inventoryService.toggleAllSpecimen();
  }

  protected displayVaraiblesMappingOptions(event: any, column: ColumnMetadata) {
    if (this.openMenuColumn?.position === column.position) {
      this.hideVaraiblesMappingOptions();
    } else {
      this.openMenuColumn = column;
      this.op.show(event);

      if (this.op.container) {
        this.op.align();
      }
    }
  }

  protected selectVariable(variable: string) {
    if (this.openMenuColumn) {
      if (this.columnAssignationMap().get(this.openMenuColumn?.jsonName ?? '') === variable) {
        this.variablesMapperService.assignColumnToVariable(variable, undefined);
      } else {
        this.variablesMapperService.assignColumnToVariable(variable, this.openMenuColumn.jsonName);
      }
      this.hideVaraiblesMappingOptions();
    }
  }

  private hideVaraiblesMappingOptions(): void {
    this.op.hide();
    this.openMenuColumn = undefined;
  }

}
