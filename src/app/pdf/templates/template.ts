import { RectangleParams } from './rectangleParams';
import {TagItem} from './tag-item';
import {TextParams} from './textParams';

export interface Template {
  name: string;
  items: TagItem[];
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
}
