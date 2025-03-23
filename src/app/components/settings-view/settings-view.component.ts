import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Button} from 'primeng/button';
import {ToolsService} from '../../services/tools.service';

@Component({
  selector: 'ltg-settings-view',
  imports: [
    Button
  ],
  templateUrl: './settings-view.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsViewComponent {

  private toolsService: ToolsService = inject(ToolsService);

  protected deleteAllData() {
    this.toolsService.deleteAllData();
  }
}
