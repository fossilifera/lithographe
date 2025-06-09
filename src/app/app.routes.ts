import {Routes} from '@angular/router';
import {InventoryComponent} from './routes/inventory/inventory.component';
import {SettingsComponent} from './routes/settings/settings.component';
import {HomeComponent} from './routes/home/home.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'inventory', component: InventoryComponent},
  {path: 'settings', component: SettingsComponent},
  {path: '*', redirectTo: ''},

];
