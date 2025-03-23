import {TagTemplate} from "../app/model/templates/tag-template";
import {Rectangle} from '../app/model/templates/rectangle';
import {VariableText} from '../app/model/templates/variable-text';

export const LittleTags: TagTemplate = {
  name: "Petites étiquettes",
  tagWidth: 54,
  tagHeight: 40,
  orientation: 'portrait',
  marginX: 24,
  marginY: 28.5,
  tagsPerLine: 3,
  tagsPerColumns: 6,
  items: [
    {
      type: 'Rectangle',
      xOffset: 0,
      yOffset: 0,
      width: 54,
      height: 40,
      lineWidth: 0.75
    } as Rectangle,
    {
      type: 'Rectangle',
      xOffset: 2,
      yOffset: 2,
      width: 50,
      height: 36,
      lineWidth: 0.15
    } as Rectangle,
    {
      type: 'VariableText',
      xOffset: 27, // center of tag
      yOffset: 7,
      align: 'center',
      value: '<<genus>> <<species>>',
      variables: ['genus', 'species'],
      fontName: 'helvetica',
      fontStyle: 'italic',
      fontSize: 11
    } as VariableText,
    {
      type: 'VariableText',
      xOffset: 27, // center of tag
      yOffset: 12,
      align: 'center',
      value: '<<author>> <<year>>',
      variables: ['author', 'year'],
      fontName: 'helvetica',
      fontStyle: 'normal',
      fontSize: 11
    } as VariableText,
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
