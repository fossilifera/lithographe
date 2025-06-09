import {ColumnsMapping} from './columns-mapping';

export interface CsvImportParam {
  firstLineAsHeader: boolean;
  separator: string;
  columnsMapping: ColumnsMapping;
}
