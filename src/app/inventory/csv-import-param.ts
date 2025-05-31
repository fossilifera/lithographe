import {ColumnMetadata} from './column-metadata';

export interface CsvImportParam {
  firstLineAsHeader: boolean;
  separator: string;
  columnsMapper: {
    genus: ColumnMetadata | undefined;
    species: ColumnMetadata | undefined;
  }

}
