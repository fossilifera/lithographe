import {ColumnMetadata} from './column-metadata';

export class InventoryMetadata {
  title: string;
  columns: ColumnMetadata[];
  creationDate: Date;

  constructor(title: string, columns: ColumnMetadata[]) {
    this.title = title;
    this.columns = columns;
    this.creationDate = new Date();
  }

}
