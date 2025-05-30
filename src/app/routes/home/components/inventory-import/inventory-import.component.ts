import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {Button} from 'primeng/button';
import {ImportInventoryService} from '../../../../services/import-inventory.service';
import {Card} from 'primeng/card';
import {FileSelectEvent, FileUpload} from 'primeng/fileupload';
import {ToggleSwitch} from 'primeng/toggleswitch';
import {FormsModule} from '@angular/forms';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CsvImportParam} from '../../../../model/csv-import-param';
import {first} from 'rxjs';
import {InventoryImportPreviewComponent} from '../inventory-import-preview/inventory-import-preview.component';
import {toSignal} from '@angular/core/rxjs-interop';
import {Divider} from 'primeng/divider';
import {InventoryService} from '../../../../services/inventory.service';
import {ModalService} from '../../../../services/modal.service';
import {Router} from '@angular/router';

@Component({
  selector: 'inventory-import',
  imports: [
    Button,
    Card,
    FormsModule,
    FileUpload,
    ToggleSwitch,
    RadioButtonModule,
    InventoryImportPreviewComponent,
    Divider
  ],
  templateUrl: './inventory-import.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryImportComponent {

  protected readonly importInventoryService: ImportInventoryService = inject(ImportInventoryService);
  protected readonly inventoryService: InventoryService = inject(InventoryService);
  private readonly modalService: ModalService = inject(ModalService);
  private readonly router = inject(Router);


  protected inventoryPreview = toSignal(this.importInventoryService.getColumnMetadataList());
  protected displayImportConfiguration = signal(false);
  csvImportParams: CsvImportParam = {firstLineAsHeader: true, separator: ';'};


  triggerCsvImport(event: FileSelectEvent): void {
    console.log("trigger csv import");
    this.importInventoryService.openCsvFile(event.files[0])
      .pipe(first())
      .subscribe(() => {
        this.displayImportConfiguration.set(true);
        // FIXME virer le timer
        setTimeout(() => {

          this.updatePreview();
        }, 1000);
      });
  }

  updatePreview(): void {
    console.log("TOTO");
    this.importInventoryService.getOrUpdatePreview(this.csvImportParams);

  }


  protected openStoredInventory(): void {
    this.modalService.displayModal(
      {title: "Ouverture inventaire", message: "Veuillez patientez", displaySpinner: true}
    );
    if (this.inventoryService.loadInventoryFromStorage()) {
      this.router.navigate(['/inventory']);
      this.modalService.hideModal();
    } else {
      this.modalService.displayModal({
        title: "Une erreur s'est produite pendant l'ouverture du fichier, merci d'importer un nouveau fichier.",
        closable: true
      });
    }
  }

  protected importCsv(): void {
    this.importInventoryService.importCsvInventory(this.csvImportParams);
  }

}
