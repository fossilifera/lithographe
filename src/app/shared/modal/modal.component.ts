import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {ModalService} from './modal.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {ProgressSpinner} from 'primeng/progressspinner';
import {Button} from 'primeng/button';

@Component({
  selector: 'ltg-modal',
  imports: [
    Dialog,
    ProgressSpinner,
    Button
  ],
  templateUrl: './modal.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  private modalService: ModalService = inject(ModalService);
  protected isVisible = toSignal(this.modalService.isVisible(), {initialValue: false});
  protected modalContent = toSignal(this.modalService.getModalContent());

  protected awswer(answer: boolean): void {
    this.modalService.answerToQuestion(answer);
  }

  protected closeModal(): void {
    this.modalService.hideModal();
  }
}
