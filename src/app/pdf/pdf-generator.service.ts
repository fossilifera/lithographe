import {inject, Injectable} from '@angular/core';
import {InventoryService} from '../inventory/inventory.service';
import {LoggerService} from '../shared/logger/logger.service';
import {Template} from './templates/template';
import {PdfDocument} from './generators/pdf-document';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  private inventoryService: InventoryService = inject(InventoryService);
  private logger: LoggerService = inject(LoggerService);

  public generatePDF(template: Template): void {
    this.logger.info(`Generating PDF with template ${template.name}`);
    const pdfDoc = new PdfDocument(template, this.logger);
    this.inventoryService.specimens().forEach(specimen => {
      if (!specimen.selected) {
        return;
      }
      pdfDoc.addSpecimenTag(specimen);
    });

    pdfDoc.finaliseAndOpen();
    this.logger.info(`End of pdf generation`);
  }


}
