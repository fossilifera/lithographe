import {inject, Injectable} from '@angular/core';
import {InventoryService} from './inventory.service';
import {LoggerService} from './logger.service';
import {jsPDF} from 'jspdf';
import {Specimen} from '../model/specimen';
import {TagItem} from '../model/templates/tag-item';
import {Rectangle} from '../model/templates/rectangle';
import {dateForFileNameFormat} from '../utils';
import {VariableText} from '../model/templates/variable-text';
import {TemplateService} from './template.service';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  private inventoryService: InventoryService = inject(InventoryService);
  private templateService: TemplateService = inject(TemplateService);
  private logger: LoggerService = inject(LoggerService);

  public generatePDF(): void {
    const speciemenSelectedIds: number[] = this.inventoryService.getSpeciemenSelectedIdsSync();

    this.logger.info('Generating PDF');



    const doc = new jsPDF({
      unit: 'mm',
      format: 'a4'
    });

    // FIXME
    console.log("FONTS = ",doc.getFontList());
    let coordTagX: number = 0;
    let coordTagY: number = 0;
    let index: number = 0;
    const nbTagsPerPage: number = this.templateService.getTemplateSync().tagsPerLine * this.templateService.getTemplateSync().tagsPerColumns;
    for (const id of speciemenSelectedIds) {
      if(index % this.templateService.getTemplateSync().tagsPerLine !== 0) {
        // shift tag to the right
        coordTagX += this.templateService.getTemplateSync().tagWidth;
      } else {
        // new line, return to the left margin
        coordTagX = this.templateService.getTemplateSync().marginX;
        if (index % nbTagsPerPage !== 0) {
          // breaking line
          coordTagY += this.templateService.getTemplateSync().tagHeight;
        } else {
          // last line reached, need a new page
          if(index !== 0) doc.addPage(); // no new page for the first tag
          coordTagY = this.templateService.getTemplateSync().marginY;
        }
      }

      let specimen: Specimen = this.inventoryService.getSpecimenById(id) ?? {} as Specimen;
      //FIXME
      console.log(specimen);
      this.drawTag(doc, specimen, coordTagX, coordTagY);
      index++;
    }

    doc.save(`tags-${dateForFileNameFormat()}.pdf`);

  }

  private drawTag(doc: jsPDF, specimen: Specimen, tagCoordX: number, tagCoordY: number) {
    this.logger.debug(`Draw tag for specimen id ${specimen.id} - at coordinates: X ${tagCoordX} Y ${tagCoordY}`);
    this.templateService.getTemplateSync().items
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

  private drawRectangle(doc: jsPDF, rectangle:Rectangle, tagCoordX: number, tagCoordY: number): void {
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
    doc.text(this.templateService.injectVariablesInText(variableText, specimen),
      tagCoordX + variableText.xOffset, // Coordinate against left edge of the page
      tagCoordY + variableText.yOffset, // Coordinate against upper edge of the page
      {
        align: variableText.align,
        baseline: 'top',
        maxWidth: 0 // 0 for no line break
      });
  }


}
