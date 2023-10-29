import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { TemplateModel } from './template.model';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getTemplatesCount(): Observable<number> {
    return this.httpService.get('templates/count');
  }

  getTemplateById(templateId: string): Observable<TemplateModel> {
    return this.httpService.get(`templates/byId/${templateId}`);
  }

  getTemplatesByKey(key: string): Observable<TemplateModel[]> {
    return this.httpService.get(`templates/byKey/${key}`);
  }

  getTemplatesByPage(pageIndex: number, pageSize: number): Observable<TemplateModel[]> {
    return this.httpService.get(`templates/byPage/${pageIndex}/${pageSize}`);
  }

  getTemplate() {
    return this.httpService.get('templates');
  }

  create(template: any): Observable<TemplateModel> {
    return this.httpService.post('templates', { template });
  }

  update(template: any, templateId: string): Observable<void> {
    return this.httpService.put(`templates/${templateId}`, { template });
  }

}
