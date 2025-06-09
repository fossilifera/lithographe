import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {ModalService} from './modal.service';
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
  protected modalService: ModalService = inject(ModalService);

  protected awswer(answer: boolean): void {
    this.modalService.answerToQuestion(answer);
  }

  protected closeModal(): void {
    this.modalService.hideModal();
  }
}
