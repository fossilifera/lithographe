import {ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {Button} from 'primeng/button';
import {ImportInventoryService} from '../../../../import/import-inventory.service';
import {Card} from 'primeng/card';
import {FileSelectEvent, FileUpload} from 'primeng/fileupload';
import {ToggleSwitch} from 'primeng/toggleswitch';
import {FormsModule} from '@angular/forms';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CsvImportParam} from '../../../../import/csv-import-param';
import {first} from 'rxjs';
import {InventoryImportPreviewComponent} from '../inventory-import-preview/inventory-import-preview.component';
import {Divider} from 'primeng/divider';
import {InventoryService} from '../../../../inventory/inventory.service';
import {ModalService} from '../../../../shared/modal/modal.service';
import {Router} from '@angular/router';
import {Select} from 'primeng/select';
import {StorageService} from '../../../../storage/storage.service';
import {Textarea} from 'primeng/textarea';
import {TooltipModule} from 'primeng/tooltip';

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
    Divider,
    Select,
    Textarea,
    TooltipModule
  ],
  templateUrl: './inventory-import.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryImportComponent implements OnInit {


  protected readonly importInventoryService: ImportInventoryService = inject(ImportInventoryService);
  protected readonly inventoryService: InventoryService = inject(InventoryService);
  private readonly modalService: ModalService = inject(ModalService);
  private readonly storageService: StorageService = inject(StorageService);
  private readonly router = inject(Router);


  protected displayImportConfiguration = signal(false);
  protected csvImportParams: CsvImportParam = {
    firstLineAsHeader: true,
    separator: ';',
    columnsMapping: {}
  };
  protected readonly authorAndYearSeparately: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this.prefillCsvParams();
  }

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

  toogleAuthorAndYearSeparately(): void {
    this.authorAndYearSeparately.update(value => !value);
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
    this.storageService.persistCsvImportParams(this.csvImportParams);
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

  private prefillCsvParams(): void {
    const csvParamsStorage = this.storageService.getCsvImportParamsFromStorage();
    if (csvParamsStorage) {
      this.csvImportParams = csvParamsStorage;
      if(csvParamsStorage.columnsMapping.authorOnly && csvParamsStorage.columnsMapping.yearOnly) {
        this.authorAndYearSeparately.set(true);
      }
    }
  }

}
