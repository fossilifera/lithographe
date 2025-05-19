import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Button, ButtonLabel} from 'primeng/button';
import {ToolsService} from '../../services/tools.service';
import {Card} from 'primeng/card';
import {ImportInventoryService} from '../../services/import-inventory.service';

@Component({
  selector: 'ltg-settings-view',
  imports: [
    Button,
    ButtonLabel,
    Card
  ],
  templateUrl: './settings.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {

  private toolsService: ToolsService = inject(ToolsService);
  private importInventoryService: ImportInventoryService = inject(ImportInventoryService);

  protected importDemoInventory(): void {
    this.importInventoryService.loadDemoInventory();
  }

  protected deleteAllData() {
    this.toolsService.deleteAllData();
  }
}
