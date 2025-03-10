import {ColumnMetadata} from './column-metadata';

export class InventoryMetadata {
  title: string;
  columns: ColumnMetadata[];
  creationDate: Date;

  constructor(title: string, columns: ColumnMetadata[], creationDate: Date = new Date()) {
    this.title = title;
    this.columns = columns;
    this.creationDate = creationDate;
  }

  public static fromJson(json: string): InventoryMetadata {
    const parsed: any = JSON.parse(json);
    return new InventoryMetadata(
      parsed.title,
      parsed.columns.map((column: any) => new ColumnMetadata(column.position, column.displayName, column.jsonName)),
      new Date(parsed.creationDate)
    );
  }

}
