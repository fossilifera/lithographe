import {inject, Injectable} from '@angular/core';
import {StorageService} from '../storage/storage.service';
import {ModalService} from '../shared/modal/modal.service';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  private localStorageService: StorageService = inject(StorageService);
  private modalService: ModalService = inject(ModalService);

  public deleteAllData() {
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
        this.localStorageService.deleteAllData();
        this.modalService.displayModal({
          title: "Effacement terminé - Recharger la page",
          closable: false
        });
      }
    })
  }

}
