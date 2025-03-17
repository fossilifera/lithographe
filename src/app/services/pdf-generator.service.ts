import {inject, Injectable} from '@angular/core';
import {InventoryService} from './inventory.service';
import {LoggerService} from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  private inventoryService: InventoryService = inject(InventoryService);

  private logger: LoggerService = inject(LoggerService);

  public generateLabels(): void {

    this.logger.info('Generating PDF');
  }
}
