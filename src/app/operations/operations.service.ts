import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateOperationModel } from './create-operation.model';
import { OperationModel } from './operation.model';
import { HttpService } from '../http.service';
import { OperationNodeModel } from './operation-node.model';
import { CreateOperationNodeModel } from './create-operation-node.model';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getOperationById(operationId: string): Observable<OperationModel> {
    return this.httpService.get(`operations/byId/${operationId}`);
  }
  
  getCountOperations(): Observable<number> {
    return this.httpService.get('operations/count');
  }

  getOpeartionsByPage(
    pageIndex: number,
    pageSize: number
  ): Observable<OperationModel[]> {
    return this.httpService.get(`operations/byPage/${pageIndex}/${pageSize}`);
  }

  getOperationNodes(operationId: string): Observable<OperationNodeModel[]> {
    return this.httpService.get(`operationNodes/${operationId}`);
  }

  create(operation: CreateOperationModel): Observable<OperationModel> {
    return this.httpService.post('operations', { operation });
  }

  update(
    operation: CreateOperationModel, 
    operationId: string
  ): Observable<OperationModel> {
    return this.httpService.put(`operations/${operationId}`, { operation });
  }

  createOperationNode(
    operationNode: CreateOperationNodeModel
  ): Observable<OperationNodeModel> {
    return this.httpService.post('operationNodes', { operationNode });
  }

  uploadFile(
    formData: FormData,
    operationId: string,
    operationNodeId: string,
  ): Observable<any> {
    return this.httpService.postProgress(`operationNodes/uploadFile/${operationId}/${operationNodeId}`, formData);
  }

  updateNode(
    operationNode: OperationNodeModel, 
    operationNodeId: string
  ): Observable<void> {
    return this.httpService.put(`operationNodes/${operationNodeId}`, { operationNode });
  }

  deleteNode(
    operationNodeId: string
  ): Observable<void> {
    return this.httpService.delete(`operationNodes/${operationNodeId}`);
  }

}
