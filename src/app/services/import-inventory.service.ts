import {inject, Injectable} from '@angular/core';
import {InventoryService} from './inventory.service';
import {DEMO_INVENTORY_METADATA, DEMO_INVENTORY_SPECIMENS} from './demo-inventory';
import {LoggerService} from './logger.service';
import {ModalService} from './modal.service';
import {fromEvent} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImportInventoryService {

  private logger: LoggerService = inject(LoggerService);
  private inventoryService: InventoryService = inject(InventoryService);
  private modalService: ModalService = inject(ModalService);

  public loadDemoInventory(): void {
    this.inventoryService.loadNewInventory(DEMO_INVENTORY_METADATA, DEMO_INVENTORY_SPECIMENS);
  }

  public importCsv(fichierCsv: File): void {
    this.logger.info("ImportInventoryService", "Import csv file");
    this.modalService.displayModal(
      {title: "Import fichier CSV", message: "Veuillez patientez pendant l'import du fichier", displaySpinner: true}
    );
    // FIXME
    console.dir(fichierCsv);
    const reader = new FileReader()
    const readerLoadEnd = fromEvent(reader, 'loadend');
    reader.readAsText(fichierCsv);
    readerLoadEnd.subscribe(() => {
      //FIXME
      console.dir(reader.result);
      this.modalService.hideModal();
      this.logger.debug("ImportInventoryService", "importing csv file ended");
    });
  }
}
