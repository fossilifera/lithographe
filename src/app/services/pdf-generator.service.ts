import {inject, Injectable} from '@angular/core';
import {InventoryService} from './inventory.service';
import {LoggerService} from './logger.service';
import {jsPDF} from 'jspdf';
import {Specimen} from '../model/specimen';
import {LittleTags} from '../templates/little-tags';
import {TagTemplate} from '../model/tag-template';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  private inventoryService: InventoryService = inject(InventoryService);
  private logger: LoggerService = inject(LoggerService);
  private labelWidht: number = 54;
  private labelHeight: number = 40;

  private template: TagTemplate | undefined;

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
    doc.save("labels.pdf");

  }

  private generateTag(doc: jsPDF, specimen: Specimen, initialX: number, initialY: number) {
    this.template?.shapes.forEach(shape => {
      shape.draw(doc, initialX, initialY);
    });

    console.log(specimen);
    const text: string = (specimen.data["genre"] ?? '') + ' ' + (specimen.data["espce"] ?? '');
    console.log(text);
    doc.text(text, initialX + (this.labelWidht / 2), initialY + 5, {
      align: 'center',
      baseline: 'top',
      maxWidth: 50
    });
  }

}
