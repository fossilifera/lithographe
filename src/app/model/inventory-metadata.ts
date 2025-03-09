import {ColumnMetadata} from './column-metadata';

export class InventoryMetadata {
  readonly columns: ColumnMetadata[];

  constructor(columns: ColumnMetadata[]) {
    this.columns = columns;
  }

}
