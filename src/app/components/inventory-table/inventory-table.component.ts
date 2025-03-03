import {Component, signal, WritableSignal} from '@angular/core';
import {TableLazyLoadEvent, TableModule} from 'primeng/table';
import {Specimen} from '../../model/specimen';

@Component({
  selector: 'ltg-inventory-table',
  imports: [
    TableModule
  ],
  templateUrl: './inventory-table.component.html',
})
export class InventoryTableComponent {

  columns: string[] = ["Id", "name", "toto", "tata"];


  specimens: Specimen[] = [
    {id: 1, name: "Hildoceras biffrons"},
    {id: 2, name: "Hildoceras biffrons"},
    {id: 3, name: "Hildoceras biffrons"},
    {id: 4, name: "Hildoceras biffrons"},
    {id: 5, name: "Hildoceras biffrons"},
    {id: 6, name: "Hildoceras biffrons"},
    {id: 7, name: "Hildoceras biffrons"},
    {id: 8, name: "Hildoceras biffrons"},
    {id: 9, name: "Hildoceras biffrons"},
    {id: 10, name: "Hildoceras biffrons"},
    {id: 11, name: "Hildoceras biffrons"},
    {id: 12, name: "Hildoceras biffrons"},
    {id: 13, name: "Hildoceras biffrons"},
    {id: 14, name: "Hildoceras biffrons"},
    {id: 15, name: "Hildoceras biffrons"},
    {id: 16, name: "Hildoceras biffrons"},
    {id: 17, name: "Hildoceras biffrons"},
    {id: 18, name: "Hildoceras biffrons"},
    {id: 19, name: "Hildoceras biffrons"},
    {id: 20, name: "Hildoceras biffrons"},
    {id: 21, name: "Hildoceras biffrons"},
    {id: 22, name: "Hildoceras biffrons"},
    {id: 23, name: "Hildoceras biffrons"},
    {id: 24, name: "Hildoceras biffrons"},
    {id: 25, name: "Hildoceras biffrons"},
    {id: 26, name: "Hildoceras biffrons"},
    {id: 27, name: "Hildoceras biffrons"},
    {id: 28, name: "Hildoceras biffrons"},
    {id: 29, name: "Hildoceras biffrons"},
    {id: 30, name: "Hildoceras biffrons"},
    {id: 31, name: "Hildoceras biffrons"},
    {id: 32, name: "Hildoceras biffrons"},
    {id: 33, name: "Hildoceras biffrons"},
    {id: 34, name: "Hildoceras biffrons"},
    {id: 35, name: "Hildoceras biffrons"},
    {id: 36, name: "Hildoceras biffrons"},
    {id: 37, name: "Hildoceras biffrons"},
    {id: 38, name: "Hildoceras biffrons"},
    {id: 39, name: "Hildoceras biffrons"},
    {id: 40, name: "Hildoceras biffrons"},
    {id: 41, name: "Hildoceras biffrons"},
    {id: 42, name: "Hildoceras biffrons"},
    {id: 43, name: "Hildoceras biffrons"},
    {id: 44, name: "Hildoceras biffrons"},
    {id: 45, name: "Hildoceras biffrons"},
    {id: 46, name: "Hildoceras biffrons"},
    {id: 47, name: "Hildoceras biffrons"},
    {id: 48, name: "Hildoceras biffrons"},
    {id: 49, name: "Hildoceras biffrons"},
    {id: 50, name: "Hildoceras biffrons"},
    {id: 51, name: "Hildoceras biffrons"},
    {id: 52, name: "Hildoceras biffrons"},
    {id: 53, name: "Hildoceras biffrons"},
    {id: 54, name: "Hildoceras biffrons"},
    {id: 55, name: "Hildoceras biffrons"},
    {id: 56, name: "Hildoceras biffrons"},
    {id: 57, name: "Hildoceras biffrons"},
    {id: 58, name: "Hildoceras biffrons"},
    {id: 59, name: "Hildoceras biffrons"},
    {id: 60, name: "Hildoceras biffrons"},
    {id: 61, name: "Hildoceras biffrons"},
    {id: 62, name: "Hildoceras biffrons"},
    {id: 63, name: "Hildoceras biffrons"},
    {id: 64, name: "Hildoceras biffrons"},
    {id: 65, name: "Hildoceras biffrons"},
    {id: 66, name: "Hildoceras biffrons"},
    {id: 67, name: "Hildoceras biffrons"},
    {id: 68, name: "Hildoceras biffrons"},
    {id: 69, name: "Hildoceras biffrons"},
    {id: 70, name: "Hildoceras biffrons"},
    {id: 71, name: "Hildoceras biffrons"},
    {id: 72, name: "Hildoceras biffrons"},
    {id: 73, name: "Hildoceras biffrons"},
    {id: 74, name: "Hildoceras biffrons"},
    {id: 75, name: "Hildoceras biffrons"}
  ];

  virtualSpecimens: WritableSignal<Specimen[]> = signal([this.specimens[0]]);

  lazyLoad(event: TableLazyLoadEvent) {
    const first = event.first ?? 0;
    const rows = event.rows ?? 10;
    let loadedCars = this.specimens.slice(first, first + rows);
    this.virtualSpecimens.set(loadedCars);
  }
}
