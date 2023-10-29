import { CollectionViewer, DataSource, SelectionChange } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BehaviorSubject, Observable, merge, of } from 'rxjs';
import { last, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { OperationNodeModel } from '../operation-node.model';
import { OperationsService } from '../operations.service';

export class FlatNode {
  constructor(
    public _id: string,
    public name: string,
    public level = 1,
    public expandable = false,
    public contentType = '',
    public fileId = '',
    public isLoading = false,
    public percentDone = 0
  ) { }
}

export class DynamicDatabase {

  constructor(
    private readonly operations: OperationNodeModel[]
  ) { 
    const dataMap = new Map<string, OperationNodeModel[]>();
    for (const operation of operations) {
      let groupOperationNodes: OperationNodeModel[] = []
      for (const subOperation of operations) {
        if (operation._id === subOperation.operationNodeId) {
          groupOperationNodes.push(subOperation);
        }
      }
      dataMap.set(operation._id, groupOperationNodes);
    }
    this.dataMap = dataMap;
  }

  dataMap = new Map<string, OperationNodeModel[]>();

  rootLevelNodes: OperationNodeModel[] = [];

  initialData(): FlatNode[] {
    return this.operations.filter(e => e.operationNodeId === null).map(e => new FlatNode(e._id, e.name, 0, true));
  }

  setOperationNodes(operations: OperationNodeModel[]): void {
    const dataMap = new Map<string, OperationNodeModel[]>();
    for (const operation of operations) {
      let groupOperationNodes: OperationNodeModel[] = []
      for (const subOperation of operations) {
        if (operation._id === subOperation.operationNodeId) {
          groupOperationNodes.push(subOperation);
        }
      }
      dataMap.set(operation._id, groupOperationNodes);
    }
    this.dataMap = dataMap;
  }

  getChildren(operationId: string): OperationNodeModel[] | undefined {
    return this.dataMap.get(operationId);
  }

  isExpandable(operationId: string): boolean {
    return this.dataMap.has(operationId);
  }
}

export class DynamicDataSource implements DataSource<FlatNode> {
  dataChange = new BehaviorSubject<FlatNode[]>([]);

  get data(): FlatNode[] {
    return this.dataChange.value;
  }
  set data(value: FlatNode[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(
    private _treeControl: FlatTreeControl<FlatNode>,
    private _database: DynamicDatabase,
  ) { }

  connect(collectionViewer: CollectionViewer): Observable<FlatNode[]> {
    this._treeControl.expansionModel.changed.subscribe(change => {
      if (
        (change as SelectionChange<FlatNode>).added ||
        (change as SelectionChange<FlatNode>).removed
      ) {
        this.handleTreeControl(change as SelectionChange<FlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  disconnect(collectionViewer: CollectionViewer): void {}

  handleTreeControl(change: SelectionChange<FlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed
        .slice()
        .reverse()
        .forEach(node => this.toggleNode(node, false));
    }
  }

  removeNode(node: FlatNode) {
    const nodeIndex = this.data.indexOf(node);
    this.data.splice(nodeIndex, 1);
    this.dataChange.next(this.data);
  }

  addNode(node: FlatNode, parentNode: FlatNode|null = null) {
    if (parentNode) {
      const indexNode = this.data.indexOf(parentNode);
      this.data.splice(indexNode + 1, 0, node);
      this.dataChange.next(this.data);
    } else {
      this.data.push(node);
      this.dataChange.next(this.data);
    }
  }

  toggleNode(node: FlatNode, expand: boolean) {
    console.log('Togleando node');
    const children = this._database.getChildren(node._id);
    const index = this.data.indexOf(node);
    
    if (!children || index < 0) {
      return;
    }

    node.isLoading = true;

    if (expand) {
      const nodes = children.map(
        operationNode => new FlatNode(
          operationNode._id, 
          operationNode.name, node.level + 1, 
          !operationNode.fileId,
          operationNode.contentType || '',
          operationNode.fileId || '',
        )
      );
      this.data.splice(index + 1, 0, ...nodes);
    } else {
      let count = 0;
      for (
        let i = index + 1;
        i < this.data.length && this.data[i].level > node.level;
        i++, count++
      ) {}
      this.data.splice(index + 1, count);
    }

    this.dataChange.next(this.data);
    node.isLoading = false;
  }
}

@Component({
  selector: 'app-dialog-attach-file',
  templateUrl: './dialog-attach-file.component.html',
  styleUrls: ['./dialog-attach-file.component.sass']
})
export class DialogAttachFileComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly operationId: string,
    private readonly operationsService: OperationsService,
    private readonly sanitizer: DomSanitizer,
    private readonly ngZone: NgZone,
  ) {
    this.treeControl = new FlatTreeControl<FlatNode>(this.getLevel, this.isExpandable);
  }

  public url: SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  public accept: string = '';
  public isLoading: boolean = false;
  public tabIndex: number = 0;
  public fileId: string = '';

  treeControl: FlatTreeControl<FlatNode>;

  dataSource!: DynamicDataSource;

  dataBase!: DynamicDatabase;

  getLevel = (node: FlatNode) => node.level;

  isExpandable = (node: FlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: FlatNode) => _nodeData.expandable;

  ngOnInit(): void { 
    this.operationsService.getOperationNodes(this.operationId).subscribe(operationNodes => {
      this.dataBase = new DynamicDatabase(operationNodes);
      this.dataSource = new DynamicDataSource(this.treeControl, this.dataBase);
      this.dataSource.data = this.dataBase.initialData();
    });
  }

  fetchData() {
    return new Promise((resolve, reject) => {
      this.isLoading = true;
      this.operationsService.getOperationNodes(this.operationId).subscribe(operationNodes => {
        this.dataBase.setOperationNodes(operationNodes);
        resolve(true);
      });
    });
  }

  downloadURI(uri: string, name: string) {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.items) {
      [...event.dataTransfer.items as any].forEach((item, i) => {
        const files: File[] = [];
        if (item.kind === "file") {
          const file = item.getAsFile();
          files.push(file);
          console.log(`… file[${i}].name = ${file.name}`);
        }
        const promises: Promise<any>[] = [];
        for (let index = 0; index < files.length; index++) {
          const file = files[index];
          const formData = new FormData();
          formData.append('file', file);
        }
        // Promise.all(promises).then(() => {
        //   this.fetchData();
        //   this.onChangePdfEvent$.next();
        // });
      });
    }
  }

  onDeleteNode(operationNode: FlatNode) {
    const ok = confirm('Esta seguro de eliminar?...');
    if (ok) {
      this.operationsService.deleteNode(operationNode._id).subscribe(() => {
        const isExpanded = this.treeControl.isExpanded(operationNode);
        if (isExpanded) {
          this.treeControl.collapse(operationNode);
        }
        this.dataSource.removeNode(operationNode);
        this.fetchData();
      });
    }
  }

  onUpdateNode(operationNode: OperationNodeModel) {
    const name = prompt('Cambiar nombre de carpeta');
    if (name) {
      operationNode.name = name;
      this.operationsService.updateNode(operationNode, operationNode._id).subscribe(() => {
        this.fetchData();
      });
    }
  }

  onCreateNode(parentNode: FlatNode|null) {
    const operationNodeId = parentNode ? parentNode._id : null;
    const name = prompt('Nueva carpeta');
    if (name) {
      const operationNode = { name, operationId: this.operationId, operationNodeId };
      this.operationsService.createOperationNode(operationNode).subscribe({
        next: async createdOperationNode => {
          const level = parentNode ? parentNode.level + 1 : 0;
          const createdFlatNode = new FlatNode(
            createdOperationNode._id,
            createdOperationNode.name,
            level,
            true,
          )
          await this.fetchData();
          let isExpanded = false;
          if (parentNode) {
            isExpanded = this.treeControl.isExpanded(parentNode);
            if (isExpanded) {
              this.treeControl.collapse(parentNode);
              this.treeControl.expand(parentNode);
            }
          } else {
            this.dataSource.addNode(createdFlatNode, parentNode);
          }
        }, 
        error: (error: HttpErrorResponse) => {
          console.log(error.error.message);
        }
      });
    }
  }

  onSelectFile(operationNode: FlatNode) {
    this.fileId = operationNode.fileId || '';
    if (
      operationNode.contentType && 
      (operationNode.contentType === 'application/pdf' || operationNode.contentType.includes('image'))
    ) {
      this.tabIndex = 1;
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.baseUrl}operationNodes/byFileId/${this.fileId}`);
    } else {
      this.downloadURI(`${environment.baseUrl}operationNodes/byFileIdDownload/${this.fileId}/${operationNode.name}`, operationNode.name);
    }
  }

  onDragOver(event: Event) {
    event.stopPropagation();
    event.preventDefault();
  }

  private getEventMessage(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file`;
  
      case HttpEventType.UploadProgress:
        this.ngZone.run(() => {
          const percentDone = event.total ? Math.round(100 * event.loaded / event.total) : 0;
          console.log(event);
          console.log(percentDone);
        });
        return `File uploaded.`;
  
      case HttpEventType.Response:
        return event.body;
  
      default:
        return `File surprising upload event: ${event.type}.`;
    }
  }

  // showProgress(message: string) {
  //   console.log(message);
  // }

  handleError(file: File) {
    return of('chulapex');
  }

  onFileSelected(
    files: FileList|null, 
    parentNode: FlatNode, 
    input: HTMLInputElement
  ) {
    console.log(files);
    if (files !== null) {
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);
      const createdDynamicFlatNode = new FlatNode(
        '',
        file.name,
        parentNode.level,
        false,
        '',
        '',
        true
      );
      this.operationsService.uploadFile(formData, this.operationId, parentNode._id).pipe(
        map(event => this.getEventMessage(event)),
        // tap(message => this.showProgress(message)),
        last(), // return last (completed) message to caller
      ).subscribe({
        next: async createdOperationNode => {
          await this.fetchData();
          const isExpanded = this.treeControl.isExpanded(parentNode);
          if (isExpanded) {
            this.treeControl.collapse(parentNode);
            this.treeControl.expand(parentNode);
          } else {
            this.treeControl.toggle(parentNode);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log('Errorrrrrrrrrrrrrrrrrrr');
          console.log(error);
        }
      });
    }
    input.value = '';
  }

}
