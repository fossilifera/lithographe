import {TagItem} from './tag-item';

/**
 * @prop {number} xOffset offset against left edge of the tag
 * @prop {number} yOffset offset against upper edge of the tag
 * @prop {string} value string of texte with "<<value>>" for inject variables
 * @prop {string[]} variables name of variables to inject in value string
 * @prop {'left' | 'center' | 'right' | 'justify'} align alignement of the text (if center the x coordinate is the center of text
 * */
export interface VariableText extends TagItem {
  xOffset: number;
  yOffset: number;
  value: string;
  variables: string[];
  align: 'left' | 'center' | 'right' | 'justify';
}
