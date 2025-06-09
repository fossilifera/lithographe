import {TableColumn} from './table-column';

export interface TablePreview {
  columns: TableColumn[];
  data: Record<string, string>[];
  isLoaded: boolean;
  isError?: boolean;
}
