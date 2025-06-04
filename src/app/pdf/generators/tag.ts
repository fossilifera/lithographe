import {jsPDF} from 'jspdf';
import {Template} from '../templates/template';
import {Specimen} from '../../inventory/specimen';
import {RectangleParams} from '../templates/rectangleParams';
import {TextParams} from '../templates/textParams';

export class Tag {

  private readonly specimen: Specimen;
  private readonly pdf: jsPDF;
  private readonly template: Template;
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
    this.template.borders.forEach(
      border => this.drawBorder(border)
    );
    this.drawCollectionNumber();
    this.drawIdentification();
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

  private writeText(text: string, params: TextParams): void {
    this.pdf.setFont(
      params.fontName ?? 'helvetica',
      params.fontStyle ?? 'normal',
      400 // font weight
    );
    let fontSize = params.fontSize ?? params.fontSize;
    console.log(params);
    if (params.maxTextWidth) {
      const mawWithInPoints: number = params.maxTextWidth * 2.8125;
      while (this.pdf.getStringUnitWidth(text) * fontSize >= mawWithInPoints) {
        // reduce font size until text fits
        fontSize-=1;
        if(fontSize <= 7) {
          // if the size reaches a critical minimum, the text is cut
          while(this.pdf.getStringUnitWidth(text+"[...]") * fontSize >= mawWithInPoints) {
            text = text.slice(0, -1);
            console.log(">>>   ", text);
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
