import {TableColumn} from './table-column';

export interface ColumnsMapping {
  // FIXME à virer
  [key: string]: TableColumn|undefined;
  number?: TableColumn;
  phylum?: TableColumn;
  class?: TableColumn;
  order?: TableColumn;
  family?: TableColumn;
  genus?: TableColumn;
  species?: TableColumn;
  authorAndYear?: TableColumn;
  authorOnly?: TableColumn;
  yearOnly?: TableColumn;
  country?: TableColumn;
  region?: TableColumn;
  location?: TableColumn;
  age?: TableColumn;
  lithostratigraphy?: TableColumn;
}
