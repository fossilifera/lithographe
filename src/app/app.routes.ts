import {Routes} from '@angular/router';
import {InventoryPageComponent} from './pages/inventory-page/inventory-page.component';
import {SettingsPageComponent} from './pages/settings-page/settings-page.component';

export const ROUTES_PATHS = {
  settings: "settings"
}

export const routes: Routes = [
  {path: '', component: InventoryPageComponent},
  {path: ROUTES_PATHS.settings, component: SettingsPageComponent},
  {path: '*', redirectTo: ''},

];
