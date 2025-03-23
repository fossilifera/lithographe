import {TagTemplate} from '../app/model/templates/tag-template';
import {Rectangle} from '../app/model/templates/rectangle';
import {VariableText} from '../app/model/templates/variable-text';

export const BigTags: TagTemplate = {
  name: "Grandes étiquettes",
  tagWidth: 111,
  tagHeight: 40,
  orientation: 'landscape',
  marginX: 37.5,
  marginY: 20,
  tagsPerLine: 2,
  tagsPerColumns: 4,
  items: [
    {
      type: 'Rectangle',
      xOffset: 0,
      yOffset: 0,
      width: 111,
      height: 40,
      lineWidth: 0.75
    } as Rectangle,
    {
      type: 'Rectangle',
      xOffset: 2,
      yOffset: 2,
      width: 107,
      height: 36,
      lineWidth: 0.15
    } as Rectangle,
    {
      type: 'VariableText',
      xOffset: 55.5, // center of tag
      yOffset: 6,
      align: 'center',
      value: '<<genus>> <<species>>',
      variables: ['genus', 'species'],
      fontName: 'helvetica',
      fontStyle: 'italic',
      fontSize: 11
    } as VariableText,
    {
      type: 'VariableText',
      xOffset: 55.5, // center of tag
      yOffset: 11,
      align: 'center',
      value: '<<author>> <<year>>',
      variables: ['author', 'year'],
      fontName: 'helvetica',
      fontStyle: 'normal',
      fontSize: 11
    } as VariableText,
    {
      type: 'VariableText',
      xOffset: 55.5, // center of tag
      yOffset: 16,
      align: 'center',
      value: '<<locality>>',
      variables: ['locality'],
      fontName: 'helvetica',
      fontStyle: 'normal',
      fontSize: 11
    } as VariableText,
    {
      type: 'VariableText',
      xOffset: 55.5, // center of tag
      yOffset: 21,
      align: 'center',
      value: '<<age>>',
      variables: ['age'],
      fontName: 'helvetica',
      fontStyle: 'normal',
      fontSize: 11
    } as VariableText,
    {
      type: 'VariableText',
      xOffset: 55.5, // center of tag
      yOffset: 26,
      align: 'center',
      value: '<<number>>',
      variables: ['number'],
      fontName: 'helvetica',
      fontStyle: 'normal',
      fontSize: 11
    } as VariableText,
    {
      type: 'VariableText',
      xOffset: 55.5, // center of tag
      yOffset: 31,
      align: 'center',
      value: '<<type>>',
      variables: ['type'],
      fontName: 'helvetica',
      fontStyle: 'normal',
      fontSize: 11,
      fontColor: '#FF0000'
    } as VariableText
  ]
}
