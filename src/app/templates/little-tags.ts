import {TagTemplate} from '../model/tag-template';
import {Rectangle} from '../model/rectangle';

export const LittleTags: TagTemplate = {
  name: "Petites étiquettes",
  shapes: [
    new Rectangle(54, 40, 0, 0, 1),
    new Rectangle(50, 36, 2, 2, 0.25)
  ]
}
