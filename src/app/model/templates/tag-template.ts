import {TagItem} from './tag-item';

export interface TagTemplate {
  name: string;
  items: TagItem[];
  tagWidth: number;
  tagHeight: number;
  marginX: number;
  marginY: number;
  tagsPerLine: number;
  tagsPerColumns: number;
}
