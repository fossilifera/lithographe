import {inject, Injectable} from '@angular/core';
import {VariableText} from '../model/templates/variable-text';
import {Specimen} from '../model/specimen';
import {LoggerService} from './logger.service';
import {TemplateService} from './template.service';
import {TagTemplate} from '../model/templates/tag-template';

@Injectable({
  providedIn: 'root'
})
export class VariablesMapperService {

  private logger: LoggerService = inject(LoggerService);
  private variableMappingMap = new Map<string, string | undefined>;
  private templateService: TemplateService = inject(TemplateService);

  constructor() {
    this.templateService.getTemplate().subscribe((template: TagTemplate) => {
      this.applyTemplateOnMap(template);
    });

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
    let colName: string | undefined = this.variableMappingMap.get(variableName);
    if (!colName) {
      this.logger.error(`Error during variable injection: the variable ${variableName} is not mapped to one column.`);
      return '';
    }
    return (specimen.data[colName] as string) ?? '';
  }

  private applyTemplateOnMap(template: TagTemplate) {
    this.logger.debug(`Update variable map with new template ${template.name}`);
    const listOfTemplateVariables: string[] = this.extractVariableListFromTemplate(template);
    listOfTemplateVariables.forEach(variable => {
      // avoid to overwrite the variable already mapped
      if (!this.variableMappingMap.has(variable)) {
        this.variableMappingMap.set(variable, undefined);
        this.logger.trace(`Updating variable map: add new key ${variable}`);
      }
      // clean variables not present in new template
      this.variableMappingMap.forEach((value, key) => {
        if (!listOfTemplateVariables.includes(key)) {
          this.variableMappingMap.delete(key);
          this.logger.trace(`Updating variable map: delete key ${key}`);
        }
      })
    });
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
