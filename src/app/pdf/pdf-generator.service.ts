import {computed, inject, Injectable} from '@angular/core';
import {InventoryService} from '../inventory/inventory.service';
import {Logger} from '../shared/logger/logger';
import {Template} from './templates/template';
import {PdfDocument} from './generators/pdf-document';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  private inventoryService: InventoryService = inject(InventoryService);
  private logger: Logger = new Logger('PdfGeneratorService');

  public readonly isCreateTagsReady = computed(() => {
    return this.inventoryService.isInventoryLoaded() && !this.inventoryService.isNoneSpecimenSelected();
  });


  public generatePDF(template: Template): void {
    this.logger.info(`Generating PDF with template ${template.name}`);

    const pdfDoc = new PdfDocument(template);
    this.inventoryService.specimens()
      .filter(specimen => specimen.selected)
      .forEach(specimen =>
        pdfDoc.addTagForSpecimen(specimen)
      );

    pdfDoc.finaliseAndOpen();
    this.logger.info(`End of pdf generation`);
  }


}
