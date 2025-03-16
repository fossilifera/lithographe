import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ModalContent} from '../model/modal-content';
import {LoggerService} from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private logger: LoggerService = inject(LoggerService);

  private visibleModalSubject = new BehaviorSubject<boolean>(false);
  private modalContentSubject = new BehaviorSubject<ModalContent|undefined>(undefined);

  public isVisible(): Observable<boolean> {
    return this.visibleModalSubject.asObservable();
  }

  public getModalContent(): Observable<ModalContent|undefined> {
    return this.modalContentSubject.asObservable();
  }

  public displayModal(modalContent: ModalContent): void {
    this.logger.debug("Display modal");
    this.modalContentSubject.next(modalContent);
    this.visibleModalSubject.next(true);
  }

  public hideModal(): void {
    this.logger.debug("Hide modal");
    this.visibleModalSubject.next(false);
    this.modalContentSubject.next(undefined);
  }

}
