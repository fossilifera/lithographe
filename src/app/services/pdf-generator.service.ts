import {inject, Injectable} from '@angular/core';
import {InventoryService} from './inventory.service';
import {LoggerService} from './logger.service';
import {jsPDF} from 'jspdf';
import {Specimen} from '../model/specimen';
import {TagItem} from '../model/templates/tag-item';
import {Rectangle} from '../model/templates/rectangle';
import {VariableText} from '../model/templates/variable-text';
import {TemplateService} from './template.service';
import {TagTemplate} from '../model/templates/tag-template';
import {concatMap, first, from, map, switchMap, toArray} from 'rxjs';
import {dateForFileNameFormat} from '../utils';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  private inventoryService: InventoryService = inject(InventoryService);
  private templateService: TemplateService = inject(TemplateService);
  private logger: LoggerService = inject(LoggerService);

  public generatePDF(): void {
    // FIXME
    // initialisation of positions and index of tags
    let coordTagX: number = 0;
    let coordTagY: number = 0;
    let index: number = 0;

    this.templateService.getTemplate().pipe(
      first(),
      map(
        (template: TagTemplate) => {
          this.logger.info(`Generating PDF with template ${template.name}`);
          const nbTagsPerPage: number = template.tagsPerLine * template.tagsPerColumns;
          const doc = new jsPDF({
            unit: 'mm',
            format: 'a4',
            orientation: template.orientation ?? 'portrait'
          });
          console.log("FONTS = ", doc.getFontList());
          return {template, nbTagsPerPage, doc};
        }),
      switchMap(templateNbTagsAndPdfDoc => {
        return this.inventoryService.getSpeciemenSelectedIds().pipe(
          first(),
          concatMap((ids) => from(ids)),
          switchMap(id => {
            return this.inventoryService.getSpecimenById(id)
              .pipe(
                first(),
                map((specimen: Specimen | undefined) => {
                    if (specimen) {
                      console.log(specimen);
                      if (index % templateNbTagsAndPdfDoc.template.tagsPerLine !== 0) {
                        // shift tag to the right
                        coordTagX += templateNbTagsAndPdfDoc.template.tagWidth;
                      } else {
                        // new line, return to the left margin
                        coordTagX = templateNbTagsAndPdfDoc.template.marginX;
                        if (index % templateNbTagsAndPdfDoc.nbTagsPerPage !== 0) {
                          // breaking line
                          coordTagY += templateNbTagsAndPdfDoc.template.tagHeight;
                        } else {
                          // last line reached, need a new page
                          if (index !== 0) templateNbTagsAndPdfDoc.doc.addPage(); // no new page for the first tag
                          coordTagY = templateNbTagsAndPdfDoc.template.marginY;
                        }
                      }
                      this.drawTag(templateNbTagsAndPdfDoc, specimen, coordTagX, coordTagY);
                      index++;
                    }
                  }
                )
              )
          }),
          toArray(),
          map(() => {
            return templateNbTagsAndPdfDoc
          }),
        )
      })
    ).subscribe(templateAndPdfDoc => {
        templateAndPdfDoc.doc.save(`tags-${dateForFileNameFormat()}.pdf`);
        this.logger.info(`End of pdf generation`);
      }
    );


  }

  private drawTag(templateNbTagsAndPdfDoc: {template: TagTemplate, nbTagsPerPage: number, doc: jsPDF}, specimen: Specimen, tagCoordX: number, tagCoordY: number) {
    this.logger.debug(`Draw tag for specimen id ${specimen.id} - at coordinates: X ${tagCoordX} Y ${tagCoordY}`);
    templateNbTagsAndPdfDoc.template.items
      .forEach((item: TagItem) => {
        switch (item.type) {
          case 'Rectangle':
            this.drawRectangle(templateNbTagsAndPdfDoc.doc, item as Rectangle, tagCoordX, tagCoordY);
            break;
          case 'VariableText':
            this.writeText(templateNbTagsAndPdfDoc.doc, item as VariableText, specimen, tagCoordX, tagCoordY);
            break;
          default:
            this.logger.error("Unknown Item type");
            break;
        }
      });
  }

  private drawRectangle(doc: jsPDF, rectangle: Rectangle, tagCoordX: number, tagCoordY: number): void {
    doc.setLineWidth(rectangle.lineWidth);
    doc.rect(
      tagCoordX + rectangle.xOffset, // Coordinate against left edge of the page
      tagCoordY + rectangle.yOffset, // Coordinate against upper edge of the page
      rectangle.width,
      rectangle.height
    );
  }

  private writeText(doc: jsPDF, variableText: VariableText, specimen: Specimen, tagCoordX: number, tagCoordY: number): void {
    //FIXME bug bold italic not working
    doc.setFont(
      variableText.fontName ?? 'helvetica',
      variableText.fontStyle ?? 'normal',
      400 // font weight
    );
    doc.setFontSize(variableText.fontSize ?? 11);
    doc.setTextColor(variableText.fontColor ?? "#000")
    doc.text(this.templateService.injectVariablesInText(variableText, specimen),
      tagCoordX + variableText.xOffset, // Coordinate against left edge of the page
      tagCoordY + variableText.yOffset, // Coordinate against upper edge of the page
      {
        align: variableText.align,
        baseline: 'top',
        maxWidth: 0 // 0 for no line break
      });
  }


}
