export class InventoryMetadata {
  readonly columnNames: string[];

  constructor(columns: string[]) {
    this.columnNames = columns;
  }

}
