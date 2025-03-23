import {Component, inject} from '@angular/core';
import {ButtonDirective, ButtonLabel} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {Ripple} from 'primeng/ripple';
import {PdfGeneratorService} from '../../services/pdf-generator.service';
import {Select, SelectChangeEvent} from 'primeng/select';
import {TemplateService} from '../../services/template.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'ltg-menu-bar',
  imports: [
    ButtonDirective,
    RouterLink,
    ButtonLabel,
    Ripple,
    Select,
    FormsModule

  ],
  templateUrl: './menu-bar.component.html'
})
export class MenuBarComponent {

  private pdfGeneratorService: PdfGeneratorService = inject(PdfGeneratorService);
  private templateService: TemplateService = inject(TemplateService);

  protected templatesOptions = this.templateService.getTemplatesAvailables();
  protected templateSelected = toSignal(this.templateService.getTemplate());

  protected onChangeTemplate(event: SelectChangeEvent) {
    this.templateService.updateTemplateSelection(event.value);
  }

  protected createLabels(): void {
    this.pdfGeneratorService.generatePDF();
  }

}
