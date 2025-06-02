import {Component, inject, OnInit} from '@angular/core';
import {Button, ButtonDirective, ButtonLabel} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {Ripple} from 'primeng/ripple';
import {PdfGeneratorService} from '../../pdf/pdf-generator.service';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import {IftaLabel} from 'primeng/iftalabel';
import {TemplateRegistry} from '../../../templates/template-registry';
import {Template} from '../../pdf/templates/template';
import {Menubar} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';

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
    IftaLabel,
    Menubar

  ],
  templateUrl: './menu-bar.component.html'
})
export class MenuBarComponent implements OnInit {
  private pdfGeneratorService: PdfGeneratorService = inject(PdfGeneratorService);

  protected links: MenuItem[] | undefined;

  protected templatesOptions = TemplateRegistry;
  protected templateSelected: Template = TemplateRegistry[0];

  ngOnInit(): void {
    this.links = [
      {
        label: 'Fichier',
        route: '/',
      },
      {
        label: 'Inventaire',
        route: '/inventory',
      }

    ];
  }

  protected createLabels(): void {
    this.pdfGeneratorService.generatePDF(this.templateSelected);
  }

}
