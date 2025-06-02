import {inject, Injectable} from '@angular/core';
import {InventoryService} from '../inventory/inventory.service';
import {LoggerService} from '../shared/logger/logger.service';
import {jsPDF} from 'jspdf';
import {Specimen} from '../inventory/specimen';
import {TagItem} from './templates/tag-item';
import {Rectangle} from './templates/rectangle';
import {VariableText} from './templates/variable-text';
import {Template} from './templates/template';
import {dateForFileNameFormat} from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  private inventoryService: InventoryService = inject(InventoryService);
  private logger: LoggerService = inject(LoggerService);

  public generatePDF(template: Template): void {
    // FIXME
    // initialisation of positions and index of tags
    let coordTagX: number = 0;
    let coordTagY: number = 0;
    let index: number = 0;

    this.logger.info(`Generating PDF with template ${template.name}`);
    const nbTagsPerPage: number = template.tagsPerLine * template.tagsPerColumns;
    const doc = new jsPDF({
      unit: 'mm',
      format: 'a4',
      orientation: template.orientation ?? 'portrait'
    });
    console.log("FONTS = ", doc.getFontList());

    this.inventoryService.specimens().forEach(specimen => {
      if (!specimen.selected) {
        return;
      }
      console.log(specimen);
      if (index % template.tagsPerLine !== 0) {
        // shift tag to the right
        coordTagX += template.tagWidth;
      } else {
        // new line, return to the left margin
        coordTagX = template.marginX;
        if (index % nbTagsPerPage !== 0) {
          // breaking line
          coordTagY += template.tagHeight;
        } else {
          // last line reached, need a new page
          if (index !== 0) doc.addPage(); // no new page for the first tag
          coordTagY = template.marginY;
        }
      }
      this.drawTag(template, doc, specimen, coordTagX, coordTagY);
      index++;

    });

    doc.save(`tags-${dateForFileNameFormat()}.pdf`);
    this.logger.info(`End of pdf generation`);
  }

  private drawTag(template: Template, doc: jsPDF, specimen: Specimen, tagCoordX: number, tagCoordY: number) {
    this.logger.debug(`Draw tag for specimen id ${specimen.id} - at coordinates: X ${tagCoordX} Y ${tagCoordY}`);
    template.items
      .forEach((item: TagItem) => {
        switch (item.type) {
          case 'Rectangle':
            this.drawRectangle(doc, item as Rectangle, tagCoordX, tagCoordY);
            break;
          case 'VariableText':
            this.writeText(doc, item as VariableText, specimen, tagCoordX, tagCoordY);
            break;
          default:
            this.logger.error("Unknown Item type");
            break;
        }
      });
  }

  private drawRectangle(doc: jsPDF, rectangle: Rectangle, tagCoordX: number, tagCoordY: number): void {
    doc.setLineWidth(rectangle.lineWidth);
    doc.rect(
      tagCoordX + rectangle.xOffset, // Coordinate against left edge of the page
      tagCoordY + rectangle.yOffset, // Coordinate against upper edge of the page
      rectangle.width,
      rectangle.height
    );
  }

  private writeText(doc: jsPDF, variableText: VariableText, specimen: Specimen, tagCoordX: number, tagCoordY: number): void {
    //FIXME bug bold italic not working
    doc.setFont(
      variableText.fontName ?? 'helvetica',
      variableText.fontStyle ?? 'normal',
      400 // font weight
    );
    doc.setFontSize(variableText.fontSize ?? 11);
    doc.setTextColor(variableText.fontColor ?? "#000")
    // FIXME remplacer par nouveau système orienté métier
    let text: string = specimen.number;
    doc.text(text,
      tagCoordX + variableText.xOffset, // Coordinate against left edge of the page
      tagCoordY + variableText.yOffset, // Coordinate against upper edge of the page
      {
        align: variableText.align,
        baseline: 'top',
        maxWidth: 0 // 0 for no line break
      });
  }


}
