import {TableColumn} from './table-column';

export interface TablePreview {
  columns: TableColumn[];
  data: string[][];
  isLoaded: boolean;
  isError?: boolean;
}
