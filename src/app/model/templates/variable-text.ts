import {TagItem} from './tag-item';

/**
 * @prop {number} xOffset offset against left edge of the tag
 * @prop {number} yOffset offset against upper edge of the tag
 * @prop {string} value string of texte with "<<value>>" for inject variables
 * @prop {string[]} variables name of variables to inject in value string
 * @prop {string} fontName font name
 * @prop {string} fontStyle style (eg. normal, bold, italic...)
 * @prop {number} fontSize size in points
 * @prop {string} align alignement of the text (if center the x coordinate is the center of text
 * @prop {string} fontColor color of the font in hexadecimal (eg. #FFFFFF)
 * */
export interface VariableText extends TagItem {
  xOffset: number;
  yOffset: number;
  //FIXME à enlever
  value: string;
  variables: string[];
  fontName?: 'Helvetica' |'helvetica' | 'Courrier' | 'Times' ;
  fontStyle?: 'normal' | 'bold' | 'italic' | 'BoldItalic' | 'BoldOblique' | 'Oblique';
  fontSize: number;
  align: 'left' | 'center' | 'right' | 'justify';
  fontColor?: string;
}
