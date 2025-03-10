import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ModalContent} from '../model/modal-content';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private visibleModalSubject = new BehaviorSubject<boolean>(false);
  private modalContentSubject = new BehaviorSubject<ModalContent|undefined>(undefined);

  public isVisible(): Observable<boolean> {
    return this.visibleModalSubject.asObservable();
  }

  public getModalContent(): Observable<ModalContent|undefined> {
    return this.modalContentSubject.asObservable();
  }

  public displayModal(modalContent: ModalContent): void {
    this.modalContentSubject.next(modalContent);
    this.visibleModalSubject.next(true);
  }

  public hideModal(): void {
    this.visibleModalSubject.next(false);
    this.modalContentSubject.next(undefined);
  }

}
