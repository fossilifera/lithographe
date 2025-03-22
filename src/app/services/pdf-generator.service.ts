import {inject, Injectable} from '@angular/core';
import {InventoryService} from './inventory.service';
import {LoggerService} from './logger.service';
import {jsPDF} from 'jspdf';
import {Specimen} from '../model/specimen';
import {TagTemplate} from '../model/templates/tag-template';
import {LittleTags} from '@templates/little-tags';
import {TagItem} from '../model/templates/tag-item';
import {Rectangle} from '../model/templates/rectangle';
import {dateForFileNameFormat} from '../utils';
import {VariableText} from '../model/templates/variable-text';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  private inventoryService: InventoryService = inject(InventoryService);
  private logger: LoggerService = inject(LoggerService);
  private labelWidht: number = 54;
  private labelHeight: number = 40;

  // LittleTags as default template to avoid undefined
  private template: TagTemplate = LittleTags;

  public generatePDF(): void {
    this.template = LittleTags;
    console.log(this.template.name);
    const speciemenSelectedIds: number[] = this.inventoryService.getSpeciemenSelectedIdsSync();

    this.logger.info('Generating PDF');

    const initialX: number = 10;
    const initialY: number = 10;

    const doc = new jsPDF({
      unit: 'mm',
      format: 'a4'
    });
    console.log(doc.getFontList());
    for (const id of speciemenSelectedIds) {
      let specimen: Specimen = this.inventoryService.getSpecimenById(id) ?? {} as Specimen;
      this.generateTag(doc, specimen, initialX, initialY);
      doc.addPage();
    }

    doc.save(`tags-${dateForFileNameFormat()}.pdf`);

  }

  private generateTag(doc: jsPDF, specimen: Specimen, tagCoordX: number, tagCoordY: number) {
    console.log(this.template.items);
    this.template.items.forEach((item: TagItem) => {
      switch (item.type) {
        case 'Rectangle':
          const rectangle = item as Rectangle;
          doc.setLineWidth(rectangle.lineWidth);
          doc.rect(
            tagCoordX + rectangle.xOffset, // Coordinate against left edge of the page
            tagCoordY + rectangle.yOffset, // Coordinate against upper edge of the page
            rectangle.width,
            rectangle.height
          );
          break;
        case 'VariableText':
          const variableText = item as VariableText;
          let text: string = variableText.value;
          variableText.variables.forEach(variable => {
            text = text.replace(`<<${variable}>>`, this.injectVariable(specimen, variable));
          });
          doc.text(text,
            tagCoordX + variableText.xOffset, // Coordinate against left edge of the page
            tagCoordY + variableText.yOffset, // Coordinate against upper edge of the page
            {
            align: variableText.align,
            baseline: 'top',
            maxWidth: 50
          });
          break;
        default:
          this.logger.error("Unknown Item type");
          break;
      }
    });
  }

  private injectVariable(specimen: Specimen, variable: string): string {
    // TODO
    switch (variable) {
      case 'genus':
        return (specimen.data['genre'] as string) ?? '';
      case 'species':
        return (specimen.data['espce'] as string) ?? '';
      default:
        return '';
    }
  }

}
