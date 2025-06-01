import {Injectable} from '@angular/core';
import {ColumnMetadata} from '../inventory/column-metadata';
import {ColumnsMapping} from './columns-mapping';

@Injectable({
  providedIn: 'root'
})
export class ColumnMapperService {

  public buildColumns(columnNames: string[], mapping: ColumnsMapping): ColumnMetadata[] {
    const columns: ColumnMetadata[] = [];
    columnNames.forEach((columnName: string, index: number) => {
      let column: ColumnMetadata = {
        displayName: columnName,
        jsonName: this.mapJsonName(columnName, mapping),
        position: index
      };
      columns.push(column);
    })

    return columns;
  }

  private mapJsonName(columnName: string, mapping: ColumnsMapping): string {
    const keyMapped = Object.keys(mapping).find((key: string) => mapping[key] === columnName)
    if (keyMapped) {
      return '_' + keyMapped;
    }
    return columnName.normalize().toLowerCase();
  }


}
