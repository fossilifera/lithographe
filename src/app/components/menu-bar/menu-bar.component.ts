import {Component, inject} from '@angular/core';
import {ButtonDirective, ButtonLabel} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {Ripple} from 'primeng/ripple';
import {PdfGeneratorService} from '../../services/pdf-generator.service';

@Component({
  selector: 'ltg-menu-bar',
  imports: [
    ButtonDirective,
    RouterLink,
    ButtonLabel,
    Ripple,
  ],
  templateUrl: './menu-bar.component.html'
})
export class MenuBarComponent {

  private pdfGeneratorService: PdfGeneratorService = inject(PdfGeneratorService);

  protected createLabels(): void {
    this.pdfGeneratorService.generatePDF();
  }

}
