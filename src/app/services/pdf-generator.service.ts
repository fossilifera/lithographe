import {inject, Injectable} from '@angular/core';
import {InventoryService} from './inventory.service';
import {from, map, Observable, switchMap} from 'rxjs';
import {Specimen} from '../model/specimen';
import {BLANK_PDF, Template} from '@pdfme/common';
import {generate} from '@pdfme/generator';
import {LoggerService} from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  private inventoryService: InventoryService = inject(InventoryService);

  private logger: LoggerService = inject(LoggerService);

  public generateLabels(): void {

    this.logger.info('Generating PDF');

    const template: Template = {
      basePdf: BLANK_PDF,
      schemas: [
        [
          {
            name: 'a',
            type: 'text',
            position: {x: 0, y: 0},
            width: 10,
            height: 10,
          }
        ],
      ],
    };

    this.calculateInputs().pipe(
      switchMap(
        (inputs: Record<string, string>[]) => from(generate({template, inputs})))
    ).subscribe((pdf: any) => {
      const blob = new Blob([pdf.buffer], {type: 'application/pdf'});
      window.open(URL.createObjectURL(blob));
    });
  }

  private calculateInputs(): Observable<Record<string, string>[]> {
    return this.inventoryService.getSelectedSpecimens().pipe(
      map((specimens: Specimen[]) => {
        return specimens.map((specimen: Specimen) => this.mapInput(String(specimen.id)));
      })
    );
  }

  private mapInput(specimenId: string) {
    return {a: specimenId};
  }
}
