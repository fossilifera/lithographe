import {TagItem} from './tag-item';

export interface TagTemplate {
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
