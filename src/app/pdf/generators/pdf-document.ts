import {Template} from '../templates/template';
import {jsPDF} from 'jspdf';
import {dateForFileNameFormat} from '../../shared/utils';
import {Specimen} from '../../inventory/specimen';
import {TagItem} from '../templates/tag-item';
import {Rectangle} from '../templates/rectangle';
import {VariableText} from '../templates/variable-text';
import {LoggerService} from '../../shared/logger/logger.service';

export class PdfDocument {

  private readonly template: Template;
  private readonly logger: LoggerService;
  private readonly pdf: jsPDF;
  private readonly nbTagsPerPage: number;

  // FIXME
  // initialisation of positions and index of tags
  private coordTagX: number = 0;
  private coordTagY: number = 0;
  private index: number = 0;

  constructor(template: Template, logger: LoggerService) {
    this.template = template;
    this.logger = logger;
    this.pdf = new jsPDF({
      unit: 'mm',
      format: 'a4',
      orientation: this.template.orientation ?? 'portrait'
    });
    this.nbTagsPerPage = template.tagsPerLine * template.tagsPerColumns;

    console.log("FONTS = ", this.pdf.getFontList());
  }

  public addSpecimenTag(specimen: Specimen): void {

    console.log(specimen);
    if (this.index % this.template.tagsPerLine !== 0) {
      // shift tag to the right
      this.coordTagX += this.template.tagWidth;
    } else {
      // new line, return to the left margin
      this.coordTagX = this.template.marginX;
      if (this.index % this.nbTagsPerPage !== 0) {
        // breaking line
        this.coordTagY += this.template.tagHeight;
      } else {
        // last line reached, need a new page
        if (this.index !== 0) this.pdf.addPage(); // no new page for the first tag
        this.coordTagY = this.template.marginY;
      }
    }
    this.drawTag(specimen);
    this.index++;

  }

  public finaliseAndOpen(): void {
    this.pdf.save(`tags-${dateForFileNameFormat()}.pdf`);
  }

  private drawTag(specimen: Specimen): void {
    this.logger.debug(`Draw tag for specimen id ${specimen.id} - at coordinates: X ${this.coordTagX} Y ${this.coordTagY}`);
    this.template.items
      .forEach((item: TagItem) => {
        switch (item.type) {
          case 'Rectangle':
            this.drawRectangle(item as Rectangle);
            break;
          case 'VariableText':
            this.writeText(item as VariableText, specimen);
            break;
          default:
            this.logger.error("Unknown Item type");
            break;
        }
      });
  }

  private drawRectangle(rectangle: Rectangle): void {
    this.pdf.setLineWidth(rectangle.lineWidth);
    this.pdf.rect(
      this.coordTagX + rectangle.xOffset, // Coordinate against left edge of the page
      this.coordTagY + rectangle.yOffset, // Coordinate against upper edge of the page
      rectangle.width,
      rectangle.height
    );
  }

  private writeText(variableText: VariableText, specimen: Specimen): void {
    //FIXME bug bold italic not working
    this.pdf.setFont(
      variableText.fontName ?? 'helvetica',
      variableText.fontStyle ?? 'normal',
      400 // font weight
    );
    this.pdf.setFontSize(variableText.fontSize ?? 11);
    this.pdf.setTextColor(variableText.fontColor ?? "#000")
    // FIXME remplacer par nouveau système orienté métier
    let text: string = specimen.number;
    this.pdf.text(text,
      this.coordTagX + variableText.xOffset, // Coordinate against left edge of the page
      this.coordTagY + variableText.yOffset, // Coordinate against upper edge of the page
      {
        align: variableText.align,
        baseline: 'top',
        maxWidth: 0 // 0 for no line break
      });
  }

}
