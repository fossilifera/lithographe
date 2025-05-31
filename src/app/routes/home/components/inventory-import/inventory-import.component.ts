import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {Button} from 'primeng/button';
import {ImportInventoryService} from '../../../../inventory/import-inventory.service';
import {Card} from 'primeng/card';
import {FileSelectEvent, FileUpload} from 'primeng/fileupload';
import {ToggleSwitch} from 'primeng/toggleswitch';
import {FormsModule} from '@angular/forms';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CsvImportParam} from '../../../../inventory/csv-import-param';
import {first} from 'rxjs';
import {InventoryImportPreviewComponent} from '../inventory-import-preview/inventory-import-preview.component';
import {toSignal} from '@angular/core/rxjs-interop';
import {Divider} from 'primeng/divider';
import {InventoryService} from '../../../../inventory/inventory.service';
import {ModalService} from '../../../../shared/modal/modal.service';
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

    this.modalService.displayModal(
      {title: "Lecture fichier CSV", message: "Veuillez patientez pendant l'import du fichier", displaySpinner: true}
    );

    this.importInventoryService.openCsvFile(event.files[0])
      .pipe(first())
      .subscribe(() => {
        this.displayImportConfiguration.set(true);
        this.updatePreview();
        this.modalService.hideModal();
      });
  }

  updatePreview(): void {
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
    this.modalService.displayModal(
      {title: "Import fichier CSV", message: "Veuillez patientez pendant l'import du fichier", displaySpinner: true}
    );
    if (this.importInventoryService.importCsvInventory(this.csvImportParams)) {
      this.modalService.hideModal();
      this.router.navigate(['/inventory']);
    } else {
      this.modalService.displayModal({
        title: "Une erreur s'est produite durant l'import du fichier csv. Merci de recharger l'application et vérifier le fichier.",
        closable: false
      });
    }
  }

}
