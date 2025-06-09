import {Template} from '../app/pdf/templates/template';

export const BigTags: Template = {
  name: "Grandes étiquettes",
  tagWidth: 115,
  tagHeight: 40,
  orientation: 'landscape',
  marginX: 37.5,
  marginY: 20,
  tagsPerLine: 2,
  tagsPerColumns: 4,
  borders: [
    {
      xOffset: 0,
      yOffset: 0,
      width: 115,
      height: 40,
      lineWidth: 0.75
    },
    {
      xOffset: 2,
      yOffset: 2,
      width: 111,
      height: 36,
      lineWidth: 0.15
    }
  ],
  idNumber: {
    xOffset: 5,
    yOffset: 5,
    align: 'left',
    fontName: 'helvetica',
    fontStyle: 'normal',
    fontSize: 12
  },
  identification: {
    xOffset: 55.5, // center of tag
    yOffset: 10,
    align: 'center',
    fontName: 'helvetica',
    fontStyle: 'italic',
    fontSize: 11,
    maxTextWidth: 110
  },
  authorAndYear: {
    xOffset: 55.5, // center of tag
    yOffset: 15,
    align: 'center',
    fontName: 'helvetica',
    fontStyle: 'normal',
    fontSize: 11,
    maxTextWidth: 110
  },
  location: {
    xOffset: 55.5, // center of tag
    yOffset: 20,
    align: 'center',
    fontName: 'helvetica',
    fontStyle: 'normal',
    fontSize: 11,
    maxTextWidth: 110
  },
  datation: {
    xOffset: 55.5, // center of tag
    yOffset: 25,
    align: 'center',
    fontName: 'helvetica',
    fontStyle: 'normal',
    fontSize: 11,
    maxTextWidth: 110
  },
  status: {
    xOffset: 55.5, // center of tag
    yOffset: 30,
    align: 'center',
    fontName: 'helvetica',
    fontStyle: 'normal',
    fontSize: 11,
    fontColor: '#FF0000',
    maxTextWidth: 110
  }
}
