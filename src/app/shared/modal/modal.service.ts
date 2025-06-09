import {Injectable, signal} from '@angular/core';
import {BehaviorSubject, filter, Observable, tap} from 'rxjs';
import {ModalContent} from './modal-content';
import {Logger} from '../logger/logger';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private logger: Logger = new Logger('ModalService');

  private responseToQuestionSubject = new BehaviorSubject<boolean | undefined>(undefined);

  public readonly isVisible = signal<boolean>(false);
  public readonly modalContent = signal<ModalContent|undefined>(undefined);


  public displayModal(modalContent: ModalContent): void {
    this.logger.debug("Display modal");
    this.modalContent.set(modalContent);
    this.isVisible.set(true);
  }

  public displayModalQuestion(modalContent: ModalContent): Observable<boolean> {
    this.displayModal(modalContent);
    return this.responseToQuestionSubject.asObservable().pipe(
      filter(value => value !== undefined),
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
    this.isVisible.set(false);
    this.modalContent.set(undefined);
  }

}
