import {Template} from "../app/pdf/templates/template";

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
    fontSize: 12
  },
  identification: {
    xOffset: 27, // center of tag
    yOffset: 15,
    align: 'center',
    fontName: 'helvetica',
    fontSize: 11,
    maxTextWidth: 48
  },
  authorAndYear: {
    xOffset: 27, // center of tag
    yOffset: 20,
    align: 'center',
    fontName: 'helvetica',
    fontStyle: 'normal',
    fontSize: 11,
    maxTextWidth: 48
  },
  location: {
    xOffset: 27, // center of tag
    yOffset: 25,
    align: 'center',
    fontName: 'helvetica',
    fontStyle: 'normal',
    fontSize: 11,
    maxTextWidth: 48
  },
  datation: {
    xOffset: 27, // center of tag
    yOffset: 30,
    align: 'center',
    fontName: 'helvetica',
    fontStyle: 'normal',
    fontSize: 11,
    maxTextWidth: 48
  },
  items: []
}
