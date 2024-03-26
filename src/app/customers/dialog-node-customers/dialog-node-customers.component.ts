import { CollectionViewer, DataSource, SelectionChange } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Inject, NgZone } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BehaviorSubject, Observable, catchError, firstValueFrom, last, lastValueFrom, map, merge, tap } from 'rxjs';
import { ObjectId } from 'src/app/shared/ObjectId';
import { CustomersService } from '../customers.service';
import { CustomerNodeModel } from '../customer-node.model';
import { CreateCustomerNodeModel } from '../create-customer-node.model';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';

export interface UploadFileModel {
    name: string
    progressPercent: number
    message: string | null
}

export enum CustomerNodeType {
    DOCUMENT = 'DOCUMENT',
    // EXPERIENCE = 'EXPERIENCE',
    // FINANCIAL = 'FINANCIAL'
}

export interface DialogCustomerNodeData {
    customerId: string
    type: CustomerNodeType
    nodeIncludes?: string[]
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
        private readonly customerNodes: CustomerNodeModel[]
    ) {
        const dataMap = new Map<string, CustomerNodeModel[]>()
        for (const customerNode of customerNodes) {
            let groupOperationNodes: CustomerNodeModel[] = []
            for (const subOperation of customerNodes) {
                if (customerNode._id === subOperation.customerNodeId) {
                    groupOperationNodes.push(subOperation);
                }
            }
            dataMap.set(customerNode._id, groupOperationNodes);
        }
        this.dataMap = dataMap;
    }

    dataMap = new Map<string, CustomerNodeModel[]>();

    rootLevelNodes: CustomerNodeModel[] = [];

    initialData(): FlatNode[] {
        return this.customerNodes.filter(e => e.customerNodeId === null).map(e => new FlatNode(e._id, e.name, 0, !e.contentType, e.contentType));
    }

    setCustomerNodes(customerNodes: CustomerNodeModel[]): void {
        const dataMap = new Map<string, CustomerNodeModel[]>();
        for (const customerNode of customerNodes) {
            let groupOperationNodes: CustomerNodeModel[] = []
            for (const subOperation of customerNodes) {
                if (customerNode._id === subOperation.customerNodeId) {
                    groupOperationNodes.push(subOperation);
                }
            }
            dataMap.set(customerNode._id, groupOperationNodes);
        }
        this.dataMap = dataMap;
    }

    getChildren(customerNodeId: string): CustomerNodeModel[] | undefined {
        return this.dataMap.get(customerNodeId);
    }

    isExpandable(customerNodeId: string): boolean {
        return this.dataMap.has(customerNodeId);
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
            if (
                (change as SelectionChange<FlatNode>).added ||
                (change as SelectionChange<FlatNode>).removed
            ) {
                this.handleTreeControl(change as SelectionChange<FlatNode>);
            }
        });

        return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
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
        const nodeIndex = this.data.indexOf(node)
        this.data.splice(nodeIndex, 1)
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
        const nodeIndex = this.data.indexOf(node)
        this.data.splice(nodeIndex, 1, node)
        this.dataChange.next(this.data)
    }

    toggleNode(node: FlatNode, expand: boolean) {
        console.log('Togleando node')
        const children = this._database.getChildren(node._id)
        const index = this.data.indexOf(node)

        if (!children || index < 0) {
            return
        }

        if (expand) {
            const nodes = children.map(
                customerNode => new FlatNode(
                    customerNode._id,
                    customerNode.name,
                    node.level + 1,
                    !customerNode.contentType,
                    customerNode.contentType || null,
                )
            )
            this.data.splice(index + 1, 0, ...nodes)
        } else {
            let count = 0;
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
    selector: 'app-dialog-node-customers',
    standalone: true,
    imports: [MaterialModule, CommonModule],
    templateUrl: './dialog-node-customers.component.html',
    styleUrl: './dialog-node-customers.component.sass'
})
export class DialogNodeCustomersComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA)
        private readonly data: DialogCustomerNodeData,
        // private readonly customersService: CustomeresService,
        private readonly customersService: CustomersService,
        private readonly sanitizer: DomSanitizer,
        private readonly ngZone: NgZone,
    ) {
        this.treeControl = new FlatTreeControl<FlatNode>(this.getLevel, this.isExpandable);
    }

    treeControl: FlatTreeControl<FlatNode>
    dataSource!: DynamicDataSource
    dataBase!: DynamicDatabase
    nodeIncludes = this.data.nodeIncludes

    url: SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('')
    accept: string = ''
    isLoading: boolean = false
    tabIndex: number = 0
    fileId: string = ''
    isDragOver = false
    uploadingFiles: UploadFileModel[] = []
    isUploading: boolean = false
    private BUCKET_NAME = 'fidenzaconsultores.appspot.com'
    private PREFIX = 'customers'

    getLevel = (node: FlatNode) => node.level;

    isExpandable = (node: FlatNode) => node.expandable;

    hasChild = (_: number, _nodeData: FlatNode) => _nodeData.expandable;

    ngOnInit(): void {
        this.customersService.getCustomerNodesByTypeCustomer(this.data.type, this.data.customerId).subscribe({
            next: customerNodes => {
                this.dataBase = new DynamicDatabase(customerNodes);
                this.dataSource = new DynamicDataSource(this.treeControl, this.dataBase);
                this.dataSource.data = this.dataBase.initialData();
            }, error: (error: HttpErrorResponse) => {
                console.log(error)
            }
        })
    }

    fetchData() {
        this.customersService.getCustomerNodesByTypeCustomer(this.data.type, this.data.customerId).subscribe(customerNodes => {
            this.dataBase.setCustomerNodes(customerNodes)
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

    onDeleteNode(customerNode: FlatNode) {
        const ok = confirm('Esta seguro de eliminar?...');
        if (ok) {
            this.customersService.deleteNode(customerNode._id).subscribe(() => {
                const isExpanded = this.treeControl.isExpanded(customerNode);
                if (isExpanded) {
                    this.treeControl.collapse(customerNode);
                }
                this.dataSource.removeNode(customerNode);
                this.fetchData();
            });
        }
    }

    isCheckNode(node: FlatNode) {
        if (this.nodeIncludes) {
            return !!this.nodeIncludes.find(e => e === node._id)
        } else {
            return false
        }
    }

    onToggleParent(childNodeId: string) {
        let parentNodeId = ''
        this.dataBase.dataMap.forEach((value, key, map) => {
            if (value.find(e => e._id === childNodeId)) {
                parentNodeId = key
            }
        })
        if (this.nodeIncludes && parentNodeId) {
            const foundIndex = this.nodeIncludes.findIndex(e => e === parentNodeId)
            if (foundIndex > -1 && parentNodeId) {
                const childrens = this.dataBase.getChildren(parentNodeId)
                let countChildre = 0
                if (childrens) {
                    for (const node of childrens) {
                        const includes = this.nodeIncludes.includes(node._id)
                        if (includes) {
                            countChildre++
                        }
                    }
                    if (!countChildre) {
                        console.log('node INDEX: ' + foundIndex);
                        this.nodeIncludes.splice(foundIndex, 1)
                    }
                }
            } else if (foundIndex < 0 && parentNodeId) {
                this.nodeIncludes.push(parentNodeId)
            }
            this.onToggleParent(parentNodeId)
        }
    }

    onToggleChildren(checked: boolean, parentNodeId: string) {
        const childrens = this.dataBase.getChildren(parentNodeId)
        if (this.nodeIncludes && childrens) {
            if (checked) {
                for (const children of childrens) {
                    const indexNode = this.nodeIncludes.findIndex(e => e === children._id)
                    if (indexNode > -1) {
                        this.nodeIncludes.splice(indexNode, 1)
                    }
                }
                for (const children of childrens) {
                    this.nodeIncludes.push(children._id)
                    this.onToggleChildren(checked, children._id)
                }
            } else {
                for (const children of childrens) {
                    const indexNode = this.nodeIncludes.findIndex(e => e === children._id)
                    if (indexNode > -1) {
                        this.nodeIncludes.splice(indexNode, 1)
                    }
                    this.onToggleChildren(checked, children._id)
                }
            }
        }
    }

    onCheckNode(checked: boolean, node: FlatNode) {
        if (this.nodeIncludes) {
            if (checked) {
                this.nodeIncludes.push(node._id)
                this.onToggleChildren(checked, node._id)
            } else {
                const indexNode = this.nodeIncludes.findIndex(e => e === node._id)
                this.nodeIncludes.splice(indexNode, 1)
                this.onToggleChildren(checked, node._id)
            }
            this.onToggleParent(node._id)
        }
    }

    onUpdateNode(customerNode: CustomerNodeModel) {
        const name = prompt('Cambiar nombre de carpeta');
        if (name) {
            customerNode.name = name;
            this.customersService.updateNode(customerNode, customerNode._id).subscribe(() => {
                this.fetchData();
            });
        }
    }

    onCreateNode(parentNode: FlatNode | null) {
        const customerNodeId = parentNode ? parentNode._id : null;
        const name = prompt('Nueva carpeta');
        if (name) {
            const customerNode: CreateCustomerNodeModel = {
                _id: ObjectId(),
                name,
                type: this.data.type,
                contentType: null,
                customerId: this.data.customerId,
                customerNodeId
            }
            this.customersService.createNode(customerNode).subscribe({
                next: async createdCustomerNode => {
                    const level = parentNode ? parentNode.level + 1 : 0;
                    const createdFlatNode = new FlatNode(
                        createdCustomerNode._id,
                        createdCustomerNode.name,
                        level,
                        true,
                    )
                    this.fetchData()
                    let isExpanded = false
                    if (parentNode) {
                        isExpanded = this.treeControl.isExpanded(parentNode);
                        if (!isExpanded) {
                            this.treeControl.expand(parentNode);
                        }
                    }
                    this.dataSource.addNode(createdFlatNode, parentNode);
                },
                error: (error: HttpErrorResponse) => {
                    console.log(error.error.message);
                }
            });
        }
    }

    onSelectFile(customerNode: FlatNode) {
        const url = `https://storage.googleapis.com/${this.BUCKET_NAME}/${this.PREFIX}/${customerNode._id}/${customerNode.name}`
        if (
            customerNode.contentType &&
            (customerNode.contentType === 'application/pdf' || customerNode.contentType.includes('image'))
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
            const createdCustomerNodes: any[] = []
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
                const promise = lastValueFrom(this.customersService.uploadFile(file, objectId, this.PREFIX).pipe(
                    map(event => this.getEventMessage(event)),
                    tap(progressPercent => {
                        uploadFile.progressPercent = progressPercent
                    }),
                    last(), // return last (completed) message to caller
                    catchError(err => {
                        throw err
                    })
                )).then(async () => {
                    const createdCustomerNode: CreateCustomerNodeModel = {
                        _id: objectId,
                        name: file.name.replace(/[^a-zA-Z0-9. ]/g, ''),
                        type: this.data.type,
                        contentType: file.type,
                        customerId: this.data.customerId,
                        customerNodeId: parentNode._id,
                    }
                    const savedCustomerNode = await lastValueFrom(this.customersService.createNode(createdCustomerNode))
                    createdCustomerNodes.push(savedCustomerNode)
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
            } catch (error) {
                console.log(error);
            }
            for (const createdCustomerNode of createdCustomerNodes) {
                const level = parentNode ? parentNode.level + 1 : 0;
                const createdFlatNode = new FlatNode(
                    createdCustomerNode._id,
                    createdCustomerNode.name,
                    level,
                    false,
                    createdCustomerNode.contentType
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
        }
        input.value = '';
    }

    traverseFileTree(
        item: any,
        customerNodeId: string | null = null
    ): Promise<void> {
        return new Promise(async (resolve, _) => {
            if (item.isFile) {
                item.file((file: any) => {
                    const uploadFile: UploadFileModel = {
                        name: file.name,
                        progressPercent: 0,
                        message: null
                    }
                    this.ngZone.run(() => {
                        this.uploadingFiles.push(uploadFile)
                    })
                    this.tabIndex = 2
                    const objectId = ObjectId()
                    lastValueFrom(this.customersService.uploadFile(file, objectId, this.PREFIX).pipe(
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
                        const createdCustomerNode: CreateCustomerNodeModel = {
                            _id: objectId,
                            name: file.name.replace(/[^a-zA-Z0-9. ]/g, ''),
                            type: this.data.type,
                            contentType: file.type,
                            customerId: this.data.customerId,
                            customerNodeId,
                        }
                        lastValueFrom(this.customersService.createNode(createdCustomerNode))
                        resolve()
                    }).catch((error: HttpErrorResponse) => {
                        console.log(error);
                        uploadFile.message = error.message
                    })
                });
            } else {
                let dirReader = item.createReader();
                const customerNode = {
                    _id: ObjectId(),
                    name: item.name,
                    type: this.data.type,
                    customerId:
                        this.data.customerId,
                    customerNodeId
                }
                const createdOperationNode = await firstValueFrom(this.customersService.createNode(customerNode))
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
        this.customersService.getCustomerNodesByTypeCustomer(this.data.type, this.data.customerId).subscribe(customerNodes => {
            this.dataBase = new DynamicDatabase(customerNodes)
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
