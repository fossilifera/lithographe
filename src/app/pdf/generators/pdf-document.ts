import {Template} from '../templates/template';
import {jsPDF} from 'jspdf';
import {dateForFileNameFormat} from '../../shared/utils';
import {Specimen} from '../../inventory/specimen';
import {Logger} from '../../shared/logger/logger';
import {Tag} from './tag';

export class PdfDocument {

  private readonly pdf: jsPDF;
  private readonly template: Template;
  private readonly logger: Logger;
  private readonly nbTagsPerPage: number;

  // initialisation of positions and index of tags
  private coordX: number = 0;
  private coordY: number = 0;
  private index: number = 0;

  constructor(template: Template) {
    this.template = template;
    this.logger = new Logger("PdfDocument");
    this.pdf = new jsPDF({
      unit: 'mm',
      format: 'a4',
      orientation: this.template.orientation ?? 'portrait'
    });
    this.nbTagsPerPage = template.tagsPerLine * template.tagsPerColumns;

    console.log("FONTS = ", this.pdf.getFontList());
  }

  public addTagForSpecimen(specimen: Specimen): void {
    this.computedPositionNewTag();
    new Tag(specimen, this.pdf, this.template, this.coordX, this.coordY).draw();
    this.index++;
  }

  public finaliseAndOpen(): void {
    this.pdf.save(`tags-${dateForFileNameFormat()}.pdf`);
  }

  private computedPositionNewTag() {
    if (this.index % this.template.tagsPerLine !== 0) {
      // shift tag to the right
      this.coordX += this.template.tagWidth;
    } else {
      // new line, return to the left margin
      this.coordX = this.template.marginX;
      if (this.index % this.nbTagsPerPage !== 0) {
        this.logger.debug("Add new line");
        // breaking line
        this.coordY += this.template.tagHeight;
      } else {
        // last line reached, need a new page
        this.logger.debug("Add new page");
        if (this.index !== 0) this.pdf.addPage(); // no new page for the first tag
        this.coordY = this.template.marginY;
      }
    }
  }

}
