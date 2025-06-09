import {jsPDF} from 'jspdf';
import {Template} from '../templates/template';
import {Specimen} from '../../inventory/specimen';
import {RectangleParams} from '../templates/rectangleParams';
import {TextParams} from '../templates/textParams';
import {Logger} from '../../shared/logger/logger';

export class Tag {

  private readonly specimen: Specimen;
  private readonly pdf: jsPDF;
  private readonly template: Template;
  private logger: Logger = new Logger("Tag");
  private readonly coordX: number;
  private readonly coordY: number;

  constructor(specimen: Specimen, pdf: jsPDF, template: Template, coordX: number, coordY: number) {
    this.specimen = specimen;
    this.pdf = pdf;
    this.template = template;
    this.coordX = coordX;
    this.coordY = coordY;
  }

  public draw(): void {
    this.logger.debug(`Draw tag for specimen id ${this.specimen.id} - number ${this.specimen.number} - at coordinates: X ${this.coordX} Y ${this.coordY}`);
        this.template.borders.forEach(
      border => this.drawBorder(border)
    );
    this.drawCollectionNumber();
    this.drawIdentification();
    this.drawAuthorAndYear();
    this.drawLocation();
    this.drawDatation();
    this.drawStatus();
  }

  private drawBorder(border: RectangleParams): void {
    this.pdf.setLineWidth(border.lineWidth);
    this.pdf.rect(
      this.coordX + border.xOffset, // Coordinate against left edge of the page
      this.coordY + border.yOffset, // Coordinate against upper edge of the page
      border.width,
      border.height
    );
  }

  private drawCollectionNumber(): void {
    if (this.template.idNumber) {
      this.writeText(this.specimen.number, this.template.idNumber);
    }
  }

  private drawIdentification(): void {
    if (this.template.identification) {
      const identificationParams: TextParams = this.template.identification;
      let text: string;
      if (this.isPresent(this.specimen.genus)) {
        identificationParams.fontStyle = 'italic';
        text = this.specimen.genus + ' ' + this.specimen.species;
      } else if (this.isPresent(this.specimen.family)) {
        identificationParams.fontStyle = 'normal';
        text = this.specimen.family;
      } else if (this.isPresent(this.specimen.order)) {
        identificationParams.fontStyle = 'normal';
        text = this.specimen.order;
      } else if (this.isPresent(this.specimen.class)) {
        identificationParams.fontStyle = 'normal';
        text = this.specimen.class;
      } else {
        identificationParams.fontStyle = 'normal';
        text = this.specimen.phylum;
      }
      this.writeText(text, identificationParams);
    }
  }

  private drawAuthorAndYear(): void {
    if(this.template.authorAndYear) {
      this.writeText(this.specimen.author, this.template.authorAndYear);
    }
  }

  private drawLocation(): void {
    if(this.template.location) {
      let text: string;
      if (this.isPresent(this.specimen.location)) {
        text = this.specimen.location;
      } else if(this.isPresent(this.specimen.region)) {
        text = this.specimen.region;
      } else {
        text = this.specimen.country;
      }
      this.writeText(text, this.template.location);
    }
  }


  private drawDatation(): void {
    if(this.template.datation) {
      let text: string;
      if (this.isPresent(this.specimen.age)) {
        text = this.specimen.age;
      } else {
        text = this.specimen.lithostratigraphy;
      }
      this.writeText(text, this.template.datation);
    }
  }

  private drawStatus(): void {
    if(this.template.status) {
      this.writeText(this.specimen.status, this.template.status);
    }
  }

  private writeText(text: string, params: TextParams): void {
    this.pdf.setFont(
      params.fontName ?? 'helvetica',
      params.fontStyle ?? 'normal',
      400 // font weight
    );

    let fontSize = params.fontSize ?? params.fontSize;
    if (params.maxTextWidth) {
      const mawWithInPoints: number = params.maxTextWidth * 2.8125;
      while (this.pdf.getStringUnitWidth(text) * fontSize >= mawWithInPoints) {
        // reduce font size until text fits
        fontSize-=1;
        if(fontSize <= 7) {
          // if the size reaches a critical minimum, the text is cut
          while(this.pdf.getStringUnitWidth(text+"[...]") * fontSize >= mawWithInPoints) {
            text = text.slice(0, -1);
          }
          text = text + "[...]";
          break;
        }
      }
    }
    this.pdf.setFontSize(fontSize);

    this.pdf.setTextColor(params.fontColor ?? "#000");
    this.pdf.text(text,
      this.coordX + params.xOffset, // Coordinate against left edge of the page
      this.coordY + params.yOffset, // Coordinate against upper edge of the page
      {
        align: params.align,
        baseline: 'top',
        maxWidth: 0 // 0 for no line break
      });
  }

  private isPresent(text: string): boolean {
    return text.length > 0;
  }

}
