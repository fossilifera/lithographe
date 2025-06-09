import {ChangeDetectionStrategy, Component, inject, isDevMode, OnInit, signal} from '@angular/core';
import {Button, ButtonLabel} from 'primeng/button';
import {Card} from 'primeng/card';
import {ImportInventoryService} from '../../import/import-inventory.service';
import {Select} from 'primeng/select';
import {LOG_LEVELS, LogLevel} from '../../shared/logger/log-levels';
import {FormsModule} from '@angular/forms';
import {ModalService} from '../../shared/modal/modal.service';
import {StorageService} from '../../storage/storage.service';

@Component({
  selector: 'ltg-settings-view',
  imports: [
    Button,
    ButtonLabel,
    Card,
    Select,
    FormsModule
  ],
  templateUrl: './settings.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {


  private storageService: StorageService = inject(StorageService);
  private modalService: ModalService = inject(ModalService);
  private importInventoryService: ImportInventoryService = inject(ImportInventoryService);

  protected isDevMode = signal(false);
  protected readonly logLevels: string[] = Array.from(LOG_LEVELS.keys());
  protected logLevel: LogLevel = LogLevel.WARN;

  ngOnInit(): void {
    this.isDevMode.set(isDevMode());
    this.logLevel = this.storageService.getLogLevel() ?? LogLevel.WARN;
  }

  protected importDemoInventory(): void {
    this.importInventoryService.loadDemoInventory();
  }

  protected deleteAllData() {
    this.modalService.displayModalQuestion({
      title: "Supprimer toutes les données",
      message: "Êtes-vous sur de supprimer toutes les données locales? La suppression est irreversible.",
      answerable: true,
      answerTrue: "Effacer toutes les données",
      answerFalse: "Annuler"
    }).subscribe(answer => {
      if (answer) {
        this.modalService.displayModal({
          title: "Effacement des données",
          message: "Veuillez patienter",
          displaySpinner: true
        });
        this.storageService.deleteAllData();
        this.modalService.displayModal({
          title: "Effacement terminé - Recharger la page",
          closable: false
        });
      }
    })
  }

  protected applySettings() {
    this.modalService.displayModal(
      {title: "Sauvegarde des paramètres", message: "Veuillez patientez", displaySpinner: true}
    );
    this.storageService.persistLogLevel(this.logLevel);
    window.location.reload();
  }
}
