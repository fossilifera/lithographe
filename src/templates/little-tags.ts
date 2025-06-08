import {Template} from "../app/pdf/templates/template";
import {VariableText} from '../app/pdf/templates/variable-text';

export const LittleTags: Template = {
  name: "Petites étiquettes",
  tagWidth: 54,
  tagHeight: 40,
  orientation: 'portrait',
  marginX: 24,
  marginY: 28.5,
  tagsPerLine: 3,
  tagsPerColumns: 6,
  borders: [
    {
      xOffset: 0,
      yOffset: 0,
      width: 54,
      height: 40,
      lineWidth: 0.75
    },
    {
      xOffset: 2,
      yOffset: 2,
      width: 50,
      height: 36,
      lineWidth: 0.15
    }
  ],
  idNumber: {
    xOffset: 5,
    yOffset: 5,
    align: 'left',
    fontName: 'helvetica',
    fontSize: 11
  },
  identification: {
    xOffset: 27, // center of tag
    yOffset: 12,
    align: 'center',
    fontName: 'helvetica',
    fontSize: 11,
    maxTextWidth: 48
  },
  authorAndYear: {
    xOffset: 27, // center of tag
    yOffset: 17,
    align: 'center',
    fontName: 'helvetica',
    fontStyle: 'normal',
    fontSize: 11,
    maxTextWidth: 48
  },
  items: [
    {
      type: 'VariableText',
      xOffset: 27, // center of tag
      yOffset: 17,
      align: 'center',
      value: '<<locality>>',
      variables: ['locality'],
      fontName: 'helvetica',
      fontStyle: 'normal',
      fontSize: 11
    } as VariableText,
    {
      type: 'VariableText',
      xOffset: 27, // center of tag
      yOffset: 22,
      align: 'center',
      value: '<<age>>',
      variables: ['age'],
      fontName: 'helvetica',
      fontStyle: 'normal',
      fontSize: 11
    } as VariableText,
    {
      type: 'VariableText',
      xOffset: 27, // center of tag
      yOffset: 27,
      align: 'center',
      value: '<<number>>',
      variables: ['number'],
      fontName: 'helvetica',
      fontStyle: 'normal',
      fontSize: 11
    } as VariableText
  ]
}
