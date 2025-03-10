import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {ModalService} from '../../services/modal.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {ProgressSpinner} from 'primeng/progressspinner';

@Component({
  selector: 'ltg-modal',
  imports: [
    Dialog,
    ProgressSpinner
  ],
  templateUrl: './modal.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  private modalService: ModalService = inject(ModalService);
  protected isVisible = toSignal(this.modalService.isVisible(), {initialValue: false});
  protected modalContent = toSignal(this.modalService.getModalContent());
}
