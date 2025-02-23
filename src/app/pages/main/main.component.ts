import { Component } from '@angular/core';
import {InventoryTableComponent} from '../../components/inventory-table/inventory-table.component';

@Component({
  selector: 'ltg-main',
  imports: [
    InventoryTableComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
