import {inject, Injectable} from '@angular/core';
import {VariableText} from '../model/templates/variable-text';
import {Specimen} from '../model/specimen';
import {LoggerService} from './logger.service';
import {TemplateService} from './template.service';
import {TagTemplate} from '../model/templates/tag-template';
import {BehaviorSubject, map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VariablesMapperService {

  private logger: LoggerService = inject(LoggerService);
  private templateService: TemplateService = inject(TemplateService);

  private variableMappingMapSubject = new BehaviorSubject<Map<string, string | undefined>>(new Map<string, string | undefined>);

  constructor() {
    this.templateService.getTemplate().subscribe((template: TagTemplate) => {
      this.applyTemplateOnMap(template);
    });

  }

  public getAllVariables(): Observable<string[]> {
    return this.variableMappingMapSubject.asObservable().pipe(
      map(mappingMap => [...mappingMap.keys()])
    );
  }

  public getUnmappedVariables(): Observable<string[]> {
    return this.variableMappingMapSubject.asObservable().pipe(
      map(mappingMap => {
        return [...mappingMap.keys()].filter(key => mappingMap.get(key) === undefined)
      })
    )
  }

  public getColumnsAssignation(): Observable<Map<string, string>> {
    return this.variableMappingMapSubject.asObservable()
      .pipe(map(mappingMap => {
        const columnMap = new Map<string, string>;
        mappingMap.forEach((value, key) => {
          if (value !== undefined) {
            columnMap.set(value, key);
          }
        })
        return columnMap;
      }));
  }

  public assignColumnToVariable(variable: string, columnJsonName: string|undefined): void {
    this.logger.trace(`Assign variable ${variable} to column ${columnJsonName}`);
    this.variableMappingMapSubject.next(
      this.variableMappingMapSubject.getValue().set(variable, columnJsonName)
    );
  }

  public injectVariablesInText(variableText: VariableText, specimen: Specimen): string {
    let text: string = variableText.value;
    variableText.variables.forEach(variable => {
      text = text.replace(`<<${variable}>>`, this.getVariableValue(variable, specimen));
    });
    this.logger.debug(`Injected variables for tag id ${specimen.id} = ${text}`);
    return text;
  }

  private getVariableValue(variableName: string, specimen: Specimen): string {
    let colName: string | undefined = this.variableMappingMapSubject.getValue().get(variableName);
    if (!colName) {
      this.logger.error(`Error during variable injection: the variable ${variableName} is not mapped to one column.`);
      return '';
    }
    return (specimen.data[colName] as string) ?? '';
  }

  private applyTemplateOnMap(template: TagTemplate) {
    this.logger.debug(`Update variable map with new template ${template.name}`);
    const variableMappingMap = this.variableMappingMapSubject.getValue();
    const listOfTemplateVariables: string[] = this.extractVariableListFromTemplate(template);
    listOfTemplateVariables.forEach(variable => {
      // avoid to overwrite the variable already mapped
      if (!variableMappingMap.has(variable)) {
        variableMappingMap.set(variable, undefined);
        this.logger.trace(`Updating variable map: add new key ${variable}`);
      }
      // clean variables not present in new template
      variableMappingMap.forEach((value, key) => {
        if (!listOfTemplateVariables.includes(key)) {
          variableMappingMap.delete(key);
          this.logger.trace(`Updating variable map: delete key ${key}`);
        }
      })
    });
    this.variableMappingMapSubject.next(variableMappingMap);
  }

  private extractVariableListFromTemplate(template: TagTemplate): string[] {
    const variablesList: string[] = [];
    template.items.filter(item => item.type === "VariableText")
      .map(item => item as VariableText)
      .forEach((variableText) => variableText.variables.forEach(variable => variablesList.push(variable)));
    this.logger.debug(`Variables extracted from template: ${variablesList}`);
    return variablesList;
  }
}
