import {inject, Injectable} from '@angular/core';
import {TagTemplate} from '../model/templates/tag-template';
import {LittleTags} from '@templates/little-tags';
import {BehaviorSubject, Observable} from 'rxjs';
import {Specimen} from '../model/specimen';
import {VariableText} from '../model/templates/variable-text';
import {LoggerService} from './logger.service';
import {TemplateRegistry} from '@templates/template-registry';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  // LittleTags as default template to avoid undefined
  private templateSubject = new BehaviorSubject<TagTemplate>(LittleTags);
  private variableMappingSubject = new BehaviorSubject<Map<string, string|undefined>>(new Map<string,string>);
  private logger: LoggerService = inject(LoggerService);


  constructor() {
    //TODO mapping type
    const mappingMap = this.variableMappingSubject.getValue();
    mappingMap.set("genus","genre");
    mappingMap.set("species","espce");
    mappingMap.set("author","auteur");
    mappingMap.set("year","anne");
    mappingMap.set("locality","commune");
    mappingMap.set("age","age");
    mappingMap.set("number","n_cpun");
    this.variableMappingSubject.next(mappingMap);
  }

  public getTemplate(): Observable<TagTemplate> {
    return this.templateSubject.asObservable();
  }

  public getTemplatesAvailables(): TagTemplate[] {
    return TemplateRegistry;
  }

  public updateTemplateSelection(templateSelected: TagTemplate): void {
    this.logger.debug(`Template selected: ${templateSelected.name}`)
    this.templateSubject.next(templateSelected);
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
    let colName: string | undefined = this.variableMappingSubject.getValue().get(variableName);
    if (!colName){
      this.logger.error(`Error during variable injection: the variable ${variableName} is not mapped to one column.`);
      return '';
    }
    return (specimen.data[colName] as string) ?? '';
  }

}
