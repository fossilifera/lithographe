import {InventoryMetadata} from '../model/inventory-metadata';
import {ColumnMetadata} from '../model/column-metadata';
import {Specimen} from '../model/specimen';

const DEMO_INVENTORY_COLUMNS: ColumnMetadata[] = [
  {position: 0, name: "Number"},
  {position: 1, name: "Phyllum"},
  {position: 2, name: "Class"},
  {position: 3, name: "Order"},
  {position: 4, name: "Genus"},
  {position: 5, name: "species"}
];

export const DEMO_INVENTORY_METADATA: InventoryMetadata = new InventoryMetadata(
  DEMO_INVENTORY_COLUMNS
);


export const DEMO_INVENTORY_SPECIMENS: Specimen[] = [
  {id: 0, name: "Hildoceras"}
];
