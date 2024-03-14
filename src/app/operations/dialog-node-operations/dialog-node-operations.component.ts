import { CollectionViewer, DataSource, SelectionChange } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BehaviorSubject, Observable, lastValueFrom, merge } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';
import { CreateOperationNodeModel } from '../create-operation-node.model';
import { OperationNodeModel } from '../operation-node.model';
import { OperationsService } from '../operations.service';
import { ObjectId } from 'src/app/shared/ObjectId';

export interface UploadFileModel {
    name: string
    progressPercent: number
    message: string | null
}

export class FlatNode {
    constructor(
        public _id: string,
        public name: string,
        public level = 1,
        public expandable = false,
        public contentType: string | null = null,
    ) { }
}

export class DynamicDatabase {

    constructor(
        private readonly operationNodes: OperationNodeModel[]
    ) {
        const dataMap = new Map<string, OperationNodeModel[]>();
        for (const operationNode of operationNodes) {
            let groupOperationNodes: OperationNodeModel[] = []
            for (const subOperationNode of operationNodes) {
                if (operationNode._id === subOperationNode.operationNodeId) {
                    groupOperationNodes.push(subOperationNode);
                }
            }
            dataMap.set(operationNode._id, groupOperationNodes);
        }
        this.dataMap = dataMap;
    }

    dataMap = new Map<string, OperationNodeModel[]>();

    rootLevelNodes: OperationNodeModel[] = [];

    initialData(): FlatNode[] {
        return this.operationNodes.filter(e => e.operationNodeId === null).map(e => {
            const flat = new FlatNode(e._id, e.name, 0, !e.contentType, e.contentType)
            console.log(flat);
            return flat
        });
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

    constructor(
        private _treeControl: FlatTreeControl<FlatNode>,
        private _database: DynamicDatabase,
    ) { }

    dataChange = new BehaviorSubject<FlatNode[]>([]);

    get data(): FlatNode[] {
        return this.dataChange.value;
    }
    set data(value: FlatNode[]) {
        this._treeControl.dataNodes = value;
        this.dataChange.next(value);
    }

    connect(collectionViewer: CollectionViewer): Observable<FlatNode[]> {
        this._treeControl.expansionModel.changed.subscribe(change => {
            if (change.added || change.removed) {
                this.handleTreeControl(change)
            }
        })

        return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data))
    }

    disconnect(collectionViewer: CollectionViewer): void { }

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

    addNode(node: FlatNode, parentNode: FlatNode | null = null) {
        if (parentNode) {
            const indexNode = this.data.indexOf(parentNode)
            const children = this._database.getChildren(parentNode._id) || []
            this.data.splice(indexNode + children.length + 1, 0, node)
            this.dataChange.next(this.data)
        } else {
            this.data.push(node)
            this.dataChange.next(this.data)
        }
    }

    updateNode(node: FlatNode) {
        const nodeIndex = this.data.indexOf(node);
        this.data.splice(nodeIndex, 1, node);
        this.dataChange.next(this.data);
    }

    toggleNode(node: FlatNode, expand: boolean) {
        console.log('Togleando node');
        const children = this._database.getChildren(node._id);
        const index = this.data.indexOf(node);

        if (!children || index < 0) {
            return;
        }

        if (expand) {
            const nodes = children.map(
                operationNode => new FlatNode(
                    operationNode._id,
                    operationNode.name, 
                    node.level + 1,
                    !operationNode.contentType,
                    operationNode.contentType || '',
                    // operationNode.mediaLink,
                )
            );
            this.data.splice(index + 1, 0, ...nodes)
        } else {
            let count = 0
            for (
                let i = index + 1;
                i < this.data.length && this.data[i].level > node.level;
                i++, count++
            ) { }
            this.data.splice(index + 1, count)
        }

        this.dataChange.next(this.data)
    }
}

@Component({
    selector: 'app-dialog-node-operations',
    templateUrl: './dialog-node-operations.component.html',
    styleUrls: ['./dialog-node-operations.component.sass']
})
export class DialogNodeOperationsComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA)
        private readonly operationId: string,
        private readonly operationsService: OperationsService,
        private readonly sanitizer: DomSanitizer,
        private readonly ngZone: NgZone,
    ) {
        this.treeControl = new FlatTreeControl<FlatNode>(this.getLevel, this.isExpandable);
    }

    treeControl: FlatTreeControl<FlatNode>
    dataSource!: DynamicDataSource
    dataBase!: DynamicDatabase

    url: SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('')
    accept: string = ''
    isLoading: boolean = false
    tabIndex: number = 0
    fileId: string = ''
    isDragOver = false
    uploadingFiles: UploadFileModel[] = []
    isUploading: boolean = false
    private BUCKET_NAME = 'fidenzaconsultores.appspot.com'

    getLevel = (node: FlatNode) => node.level;

    isExpandable = (node: FlatNode) => node.expandable;

    hasChild = (_: number, _nodeData: FlatNode) => _nodeData.expandable;

    ngOnInit(): void {
        this.operationsService.getOperationNodes(this.operationId).subscribe(operationNodes => {
            console.log(operationNodes)
            this.dataBase = new DynamicDatabase(operationNodes)
            this.dataSource = new DynamicDataSource(this.treeControl, this.dataBase)
            this.dataSource.data = this.dataBase.initialData()
        })
    }

    fetchData() {
        this.operationsService.getOperationNodes(this.operationId).subscribe(operationNodes => {
            console.log(operationNodes)
            this.dataBase.setOperationNodes(operationNodes)
        })
    }

    downloadURI(uri: string, name: string) {
        const link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    onDeleteNode(operationNode: FlatNode) {
        const ok = confirm('Esta seguro de eliminar?...');
        if (ok) {
            this.operationsService.deleteNode(operationNode._id).subscribe(() => {
                let isExpanded = false;
                isExpanded = this.treeControl.isExpanded(operationNode);
                if (isExpanded) {
                    this.treeControl.collapse(operationNode);
                }
                this.dataSource.removeNode(operationNode)
                this.fetchData()
            })
        }
    }

    onUpdateNode(operationNode: FlatNode) {
        const name = prompt('Cambiar nombre de carpeta');
        if (name) {
            operationNode.name = name;
            this.operationsService.updateNode(operationNode, operationNode._id).subscribe(() => {
                this.dataSource.updateNode(operationNode)
                this.fetchData()
            })
        }
    }

    onCreateNode(parentNode: FlatNode | null) {
        const operationNodeId = parentNode ? parentNode._id : null;
        const name = prompt('Nueva carpeta');
        if (name) {
            const operationNode: CreateOperationNodeModel = {
                _id: ObjectId(),
                name, 
                contentType: null,
                operationId: this.operationId, 
                operationNodeId, 
            }
            this.operationsService.createNode(operationNode).subscribe({
                next: async createdOperationNode => {
                    const level = parentNode ? parentNode.level + 1 : 0;
                    const createdFlatNode = new FlatNode(
                        createdOperationNode._id,
                        createdOperationNode.name,
                        level,
                        true,
                    )
                    let isExpanded = false;
                    if (parentNode) {
                        isExpanded = this.treeControl.isExpanded(parentNode);
                        if (!isExpanded) {
                            this.treeControl.expand(parentNode);
                        }
                    }
                    this.dataSource.addNode(createdFlatNode, parentNode)
                    this.fetchData()
                },
                error: (error: HttpErrorResponse) => {
                    console.log(error.error.message);
                }
            });
        }
    }

    onSelectFile(operationNode: FlatNode) {
        const url = `https://storage.googleapis.com/${this.BUCKET_NAME}/${operationNode._id}/${operationNode.name}`
        if (
            operationNode.contentType &&
            (operationNode.contentType === 'application/pdf' || operationNode.contentType.includes('image'))
        ) {
            this.tabIndex = 1
            this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url)
        } else {
            this.downloadURI(url, '');
        }
    }

    private getEventMessage(event: HttpEvent<any>): any {
        switch (event.type) {
            case HttpEventType.Sent:
                return 0

            case HttpEventType.UploadProgress:
                return event.total ? Math.round(100 * event.loaded / event.total) : 0

            case HttpEventType.Response:
                return event.body

            default:
                return 0
        }
    }

    async onFileSelected(
        files: FileList | null,
        parentNode: FlatNode,
        input: HTMLInputElement
    ) {
        if (files !== null) {
            const promises: Promise<any>[] = []
            const createdOperationNodes: any[] = []
            for (let index = 0; index < files.length; index++) {
                const file = files[index]
                const uploadFile: UploadFileModel = {
                    name: file.name.replace(/[^a-zA-Z0-9. ]/g, ''),
                    progressPercent: 0,
                    message: null
                }
                this.isUploading = true
                this.uploadingFiles.push(uploadFile)
                this.tabIndex = 2
                const objectId = ObjectId()
                const promise = lastValueFrom(this.operationsService.uploadFile(file, objectId).pipe(
                    map(event => this.getEventMessage(event)),
                    tap(progressPercent => {
                        uploadFile.progressPercent = progressPercent
                    }),
                    last(),
                    catchError(err => {
                        throw err
                    })
                )).then(async () => {
                    const createdOperationNode: CreateOperationNodeModel = {
                        _id: objectId,
                        name: file.name.replace(/[^a-zA-Z0-9. ]/g, ''),
                        contentType: file.type,
                        operationId: this.operationId,
                        operationNodeId: parentNode._id,
                    }
                    const savedOperationNode = await lastValueFrom(this.operationsService.createNode(createdOperationNode))
                    createdOperationNodes.push(savedOperationNode)
                    const subIndex = this.uploadingFiles.indexOf(uploadFile)
                    this.uploadingFiles.splice(subIndex, 1)
                }).catch((error: HttpErrorResponse) => {
                    console.log(error);
                    uploadFile.message = error.message
                })
                promises.push(promise)
            }
            try {
                await Promise.all(promises)
                for (const createdOperationNode of createdOperationNodes) {
                    const level = parentNode ? parentNode.level + 1 : 0;
                    const createdFlatNode = new FlatNode(
                        createdOperationNode._id,
                        createdOperationNode.name,
                        level,
                        false,
                        createdOperationNode.contentType
                    )
                    const isExpanded = this.treeControl.isExpanded(parentNode);
                    if (!isExpanded) {
                        this.treeControl.expand(parentNode)
                    }
                    this.dataSource.addNode(createdFlatNode, parentNode)
                }
                this.tabIndex = 0
                this.isLoading = false
                this.fetchData()
            } catch (error) {
                console.log(error);
            }
        }
        input.value = '';
    }

    traverseFileTree(
        item: any,
        operationNodeId: string | null = null
    ): Promise<void> {
        return new Promise(async (resolve, _) => {
            if (item.isFile) {
                // Get file
                item.file((file: any) => {
                    const uploadFile: UploadFileModel = {
                        name: file.name.replace(/[^a-zA-Z0-9. ]/g, ''),
                        progressPercent: 0,
                        message: null
                    }
                    this.ngZone.run(() => {
                        this.uploadingFiles.push(uploadFile)
                    })
                    this.tabIndex = 2
                    const objectId = ObjectId()
                    
                    lastValueFrom(this.operationsService.uploadFile(file, objectId).pipe(
                        map(event => this.getEventMessage(event)),
                        tap(progressPercent => {
                            this.ngZone.run(() => {
                                uploadFile.progressPercent = progressPercent
                            })
                        }),
                        last(), // return last (completed) message to caller
                        catchError(err => {
                            throw err
                        })
                    )).then(() => {
                        const createdOperationNode: CreateOperationNodeModel = {
                            _id: objectId,
                            name: file.name.replace(/[^a-zA-Z0-9. ]/g, ''),
                            contentType: file.type,
                            operationId: this.operationId,
                            operationNodeId,
                        }
                        lastValueFrom(this.operationsService.createNode(createdOperationNode))
                        resolve()
                    }).catch((error: HttpErrorResponse) => {
                        console.log(error);
                        uploadFile.message = error.message
                    })
                });
            } else {
                let dirReader = item.createReader();
                const operationNode = {
                    _id: ObjectId(), 
                    name: item.name, 
                    contentType: null,
                    operationId: this.operationId, 
                    operationNodeId,
                }
                const createdOperationNode = await lastValueFrom(this.operationsService.createNode(operationNode))
                dirReader.readEntries(async (entries: any) => {
                    for (let i = 0; i < entries.length; i++) {
                        await this.traverseFileTree(entries[i], createdOperationNode._id)
                    }
                    resolve()
                });
            }
        })
    }

    async onDrop(event: DragEvent) {
        event.preventDefault()
        event.stopPropagation()
        this.isUploading = true
        this.tabIndex = 2
        const promises: any[] = []
        if (event && event.dataTransfer) {
            var items = event.dataTransfer.items
            for (let i = 0; i < items.length; i++) {
                var item = items[i].webkitGetAsEntry()
                if (item) {
                    promises.push(this.traverseFileTree(item))
                }
            }
        }
        try {
            await Promise.all(promises)
        } catch (error) {
            console.log(error);
        }
        this.isDragOver = false
        this.isUploading = false
        this.uploadingFiles = []
        this.tabIndex = 0
        this.operationsService.getOperationNodes(this.operationId).subscribe(operationNodes => {
            this.dataBase = new DynamicDatabase(operationNodes)
            this.dataSource = new DynamicDataSource(this.treeControl, this.dataBase)
            this.dataSource.data = this.dataBase.initialData()
        })
    }

    onDragOver(event: Event) {
        this.isDragOver = true
        event.stopPropagation()
        event.preventDefault()
    }

    onDragLeave(event: Event) {
        this.isDragOver = false
        event.stopPropagation()
        event.preventDefault()
    }

}
