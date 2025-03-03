import {Routes} from '@angular/router';
import {InventoryViewComponent} from './components/inventory-view/inventory-view.component';
import {SettingsViewComponent} from './components/settings-view/settings-view.component';

export const ROUTES_PATHS = {
  settings: "settings"
}

export const routes: Routes = [
  {path: '', component: InventoryViewComponent},
  {path: ROUTES_PATHS.settings, component: SettingsViewComponent},
  {path: '*', redirectTo: ''},

];
