import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, filter, Observable, tap} from 'rxjs';
import {ModalContent} from './modal-content';
import {LoggerService} from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private logger: LoggerService = inject(LoggerService);

  private visibleModalSubject = new BehaviorSubject<boolean>(false);
  private modalContentSubject = new BehaviorSubject<ModalContent|undefined>(undefined);
  private responseToQuestionSubject = new BehaviorSubject<boolean|undefined>(undefined);


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

  public displayModalQuestion(modalContent: ModalContent): Observable<boolean> {
    this.displayModal(modalContent);
    return this.responseToQuestionSubject.asObservable().pipe(
      filter(value => value!== undefined),
      tap(() => {
        this.hideModal();
        this.responseToQuestionSubject.next(undefined);
      })
    );
  }

  public answerToQuestion(answer: boolean): void {
    this.responseToQuestionSubject.next(answer);
  }

  public hideModal(): void {
    this.logger.debug("Hide modal");
    this.visibleModalSubject.next(false);
    this.modalContentSubject.next(undefined);
  }

}
