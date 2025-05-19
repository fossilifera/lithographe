import {Component, inject} from '@angular/core';
import {Button, ButtonDirective, ButtonLabel} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {Ripple} from 'primeng/ripple';
import {PdfGeneratorService} from '../../services/pdf-generator.service';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import {IftaLabel} from 'primeng/iftalabel';
import {TemplateRegistry} from '@templates/template-registry';
import {Template} from '../../model/templates/template';

@Component({
  selector: 'ltg-menu-bar',
  imports: [
    ButtonDirective,
    RouterLink,
    ButtonLabel,
    Ripple,
    Select,
    FormsModule,
    Button,
    IftaLabel

  ],
  templateUrl: './menu-bar.component.html'
})
export class MenuBarComponent {

  private pdfGeneratorService: PdfGeneratorService = inject(PdfGeneratorService);

  protected templatesOptions = TemplateRegistry;
  protected templateSelected: Template = TemplateRegistry[0];

  protected createLabels(): void {
    this.pdfGeneratorService.generatePDF(this.templateSelected);
  }

}
