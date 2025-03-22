import {TagTemplate} from "../app/model/templates/tag-template";
import {Rectangle} from '../app/model/templates/rectangle';
import {VariableText} from '../app/model/templates/variable-text';

export const LittleTags: TagTemplate = {
  name: "Petites étiquettes",
  tagWidth: 54,
  tagHeight: 40,
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
      xOffset: 26,
      yOffset: 0,
      align: 'center',
      value: '<<genus>> <<species>>',
      variables: ['genus', 'species']
    } as VariableText
  ]
}
