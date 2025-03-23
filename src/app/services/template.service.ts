import {inject, Injectable} from '@angular/core';
import {TagTemplate} from '../model/templates/tag-template';
import {LittleTags} from '@templates/little-tags';
import {BehaviorSubject, Observable} from 'rxjs';
import {LoggerService} from './logger.service';
import {TemplateRegistry} from '@templates/template-registry';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  // LittleTags as default template to avoid undefined
  private templateSubject = new BehaviorSubject<TagTemplate>(LittleTags);
  private logger: LoggerService = inject(LoggerService);

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

}
