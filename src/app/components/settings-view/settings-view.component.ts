import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Button} from 'primeng/button';
import {StorageService} from '../../services/storage.service';

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

  private localStorageService: StorageService = inject(StorageService);

  protected deleteAllData() {
    this.localStorageService.deleteAllData();
  }
}
