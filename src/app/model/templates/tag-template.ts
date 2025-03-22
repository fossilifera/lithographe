import {TagItem} from './tag-item';

export interface TagTemplate {
  name: string;
  items: TagItem[];
  tagWidth: number;
  tagHeight: number;
}
