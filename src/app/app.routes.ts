import {Routes} from '@angular/router';
import {InventoryViewComponent} from './components/inventory-view/inventory-view.component';
import {SettingsViewComponent} from './components/settings-view/settings-view.component';

export const routes: Routes = [
  {path: '', component: InventoryViewComponent},
  {path: 'settings', component: SettingsViewComponent},
  {path: '*', redirectTo: ''},

];
