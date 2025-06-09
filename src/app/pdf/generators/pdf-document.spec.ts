import {PdfDocument} from './pdf-document';
import {LittleTags} from '../../../templates/little-tags';

describe('PdfDocument', () => {

  it('should create an instance', () => {
    expect(new PdfDocument(LittleTags)).toBeTruthy();
  });
});
