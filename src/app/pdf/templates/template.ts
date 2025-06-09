import {RectangleParams} from './rectangleParams';
import {TextParams} from './textParams';

export interface Template {
  name: string;
  tagWidth: number;
  tagHeight: number;
  orientation?: 'portrait' | 'landscape';
  marginX: number;
  marginY: number;
  tagsPerLine: number;
  tagsPerColumns: number;
  borders: RectangleParams[];
  idNumber?: TextParams;
  identification?: TextParams;
  authorAndYear?: TextParams;
  location?: TextParams;
  datation?: TextParams;
  status?: TextParams;
}
