import {ColumnMetadata} from './column-metadata';
import {Specimen} from './specimen';

export interface InventoryPreview {
  columns: ColumnMetadata[];
  specimens: Specimen[];
  isError?: boolean;
}
