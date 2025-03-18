import {inject, Injectable} from '@angular/core';
import {InventoryService} from './inventory.service';
import {LoggerService} from './logger.service';
import {jsPDF} from 'jspdf';
import {Specimen} from '../model/specimen';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  private inventoryService: InventoryService = inject(InventoryService);

  private logger: LoggerService = inject(LoggerService);

  public generateLabels(): void {

    this.logger.info('Generating PDF');

    const initialX: number = 10;
    const initialY: number = 10;
    const labelWidht: number = 54;
    const labelHeight: number = 40;

    let specimen: Specimen = this.inventoryService.getSpecimenById(0) ?? {} as Specimen;


      const doc = new jsPDF({
        unit: 'mm',
        format: 'a4'
      });
      console.log(doc.getFontList());
      // First rectangle
      doc.setLineWidth(1);
      doc.rect(initialX, initialY, labelWidht, labelHeight);
      // Second rectangle
      doc.setLineWidth(0.25);
      doc.rect(initialX + 2, initialY + 2, 50, 36);
      console.log(specimen);
      const text : string = (specimen.data["genre"]??'')+' '+(specimen.data["espce"]??'');
      console.log(text);
      doc.text(text, initialX + (labelWidht / 2), initialY + 5, {
        align: 'center',
        baseline: 'top',
        maxWidth: 50
      });
      doc.save("labels.pdf");

  }
}
