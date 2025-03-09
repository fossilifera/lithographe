import {ColumnMetadata} from './column-metadata';

export class InventoryMetadata {
  columns: ColumnMetadata[];

  constructor(columns: ColumnMetadata[]) {
    this.columns = columns;
  }

}
