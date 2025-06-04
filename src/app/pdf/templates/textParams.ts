/**
 * @prop {number} xOffset offset against left edge of the tag
 * @prop {number} yOffset offset against upper edge of the tag
 * @prop {string} fontName font name
 * @prop {string} fontStyle style (eg. normal, bold, italic...)
 * @prop {number} fontSize size in points
 * @prop {string} align alignement of the text (if center the x coordinate is the center of text
 * @prop {string} fontColor color of the font in hexadecimal (eg. #FFFFFF)
 * @prop {number} maxTextWidth max width of text (in millimeter) for automatic size text reduction, leave unset to not use this feature
 * */
export interface TextParams {
  xOffset: number;
  yOffset: number;
  fontName?: 'Helvetica' |'helvetica' | 'Courrier' | 'Times' ;
  fontStyle?: 'normal' | 'bold' | 'italic' | 'BoldItalic' | 'BoldOblique' | 'Oblique';
  fontSize: number;
  align: 'left' | 'center' | 'right' | 'justify';
  fontColor?: string;
  maxTextWidth?: number;
}
