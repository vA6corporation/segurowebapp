import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../http.service';
import { Material } from './material.model';

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
  ) { }

  sendMail(materialId: string): Observable<Material> {
    return this.httpService.get(`mails/${materialId}/mailMaterial`);
  }

  getMaterialsByAny(key: string): Observable<Material[]> {
    return this.httpService.get(`materials/byAny/${key}`);
  }

  getMaterialsByPage(pageIndex: number, pageSize: number): Observable<Material[]> {
    return this.httpService.get(`materials/${pageIndex}/${pageSize}`);
  }

  getMaterialsCount(): Observable<number> {
    return this.httpService.get('materials/count');
  }
  
  getMaterialById(materialId: string): Observable<Material> {
    return this.httpService.get(`materials/${materialId}`);
  }

  create(material: Material): Observable<Material> {
    material.businessId = this.authService.businessId;
    material.userId = this.authService.userId;
    return this.httpService.post('materials', { material });
  }

  update(material: Material, materialId: string): Observable<Material> {
    return this.httpService.put(`materials/${materialId}`, { material });
  }
}
