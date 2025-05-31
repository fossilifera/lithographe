import {TagItem} from './tag-item';

/**
 * @prop {number} xOffset offset against left edge of the tag
 * @prop {number} yOffset offset against upper edge of the tag
 * @prop {number} width - Widht of the rectangle
 * @prop {number} height - Height of the rectangle
 * @prop {number} lineWidth - Thickness of the border line
 */
export interface Rectangle extends TagItem {
  xOffset: number;
  yOffset: number;
  width: number;
  height: number;
  lineWidth: number;
}
