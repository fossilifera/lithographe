import {TagItem} from './tag-item';

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
}
