import { FlatTreeControl } from '@angular/cdk/tree';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { BusinessPdfModel } from '../business-pdf.model';
import { BusinessesService } from '../businesses.service';

export enum Types {
  DOCUMENT = 'DOCUMENT',
  EXPERIENCE = 'EXPERIENCE',
  FINANCIAL = 'FINANCIAL'
}

export interface DialogAttachPdfData {
  businessId: string
  type: Types
}

interface BusinessNode {
  isTop: boolean;
  expandable: boolean;
  name: string;
  contentType: string;
  pdfId: string;
  level: number;
  _id: string;
  childrens?: BusinessNode[]
}

@Component({
  selector: 'app-dialog-attach-pdf',
  templateUrl: './dialog-attach-pdf.component.html',
  styleUrls: ['./dialog-attach-pdf.component.sass']
})
export class DialogAttachPdfComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly data: DialogAttachPdfData,
    private readonly sanitizer: DomSanitizer,
    private readonly businessesService: BusinessesService,
  ) { }

  public url: SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  public accept: string = 'application/pdf, image/png, image/gif, image/jpeg';
  public isLoading: boolean = false;
  public businessPdfs: BusinessPdfModel[] = [];
  public tabIndex: number = 0;
  public pdfId: string = '';
  public businessPdfId: string = '';

  private _transformer = (node: BusinessNode, level: number) => {
    return {
      isTop: !!node.isTop && node.isTop,
      expandable: !!node.childrens && node.childrens.length > 0,
      name: node.name,
      contentType: node.contentType,
      pdfId: node.pdfId,
      level: level,
      // childrens: node.childrens,
      _id: node._id,
    };
  };

  public treeControl = new FlatTreeControl<BusinessNode>(
    node => node.level,
    node => node.expandable,
  );

  public treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.childrens,
  );

  public dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  
  hasChild = (_: number, node: BusinessNode) => node.isTop;

  ngOnInit(): void { 
    this.fetchData();
  }

  onCreateBusinessNode() {
    const name = prompt('Ingrese un nombre');
    if (name) {
      const businessNode = { name, type: this.data.type, businessId: this.data.businessId };
      this.businessesService.createNode(businessNode).subscribe(() => {
        this.fetchData();
      });
    }
  }

  onUpdateBusinessNode(businessNodeId: string) {
    const name = prompt('Ingrese un nombre');
    if (name) {
      const businessNode = { name };
      this.businessesService.updateNode(businessNode, businessNodeId).subscribe(() => {
        this.fetchData();
      });
    }
  }

  onDeleteBusinessNode(businessNodeId: string) {
    const ok = confirm('Esta seguro de eliminar?...');
    if (ok) {
      this.businessesService.deleteNode(businessNodeId).subscribe(() => {
        this.fetchData();
      });
    }
  }

  fetchData() {
    this.businessesService.getBusinessNodes(this.data.type, this.data.businessId).subscribe(businessNodes => {
      this.dataSource.data = businessNodes;
      console.log(this.treeControl.dataNodes);
    }, (error: HttpErrorResponse) => {
      console.log(error);    
    });
  }

  onDeletePdf(businessNode: BusinessNode) {
    const nodeIndex = this.treeControl.dataNodes.indexOf(businessNode);
    const ok = confirm('Esta seguro de eliminar?...');
    if (ok) {
      this.businessesService.deletePdf(businessNode._id, businessNode.pdfId).subscribe(() => {
        // this.fetchData();
        this.treeControl.dataNodes.splice(nodeIndex, 1);
        const isExpanded = this.treeControl.isExpanded(businessNode);
        if (isExpanded) {
          this.treeControl.collapse(businessNode);
          this.treeControl.expand(businessNode);
        } else {
          this.treeControl.toggle(businessNode);
        }
        // this.treeControl.expansionModel.changed();
      });
    }
  }

  onChangePdf(businessPdf: BusinessPdfModel) {
    console.log(businessPdf);
    this.pdfId = businessPdf.pdfId;
    this.businessPdfId = businessPdf._id;
    if (businessPdf.contentType === 'application/pdf' || businessPdf.contentType.includes('image')) {
      this.tabIndex = 1;
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.baseUrl}businessPdfs/byPdfId/${this.pdfId}`);
    } else {
      this.downloadURI(`${environment.baseUrl}businessPdfs/byPdfIdDownload/${this.pdfId}/${businessPdf.filename}`, businessPdf.filename);
    }
  }

  downloadURI(uri: string, name: string) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  onFileSelected(files: FileList|null, businessNodeId: string, businessNode: BusinessNode, input: HTMLInputElement) {
    const nodeIndex = this.treeControl.dataNodes.indexOf(businessNode);
    this.treeControl.dataNodes[nodeIndex].expandable = true;
    if (files !== null) {
      const promises: any[] = [];
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const formData = new FormData();
        formData.append('file', file);
        const promise = this.businessesService.uploadFile(formData, this.data.type, this.data.businessId, businessNodeId).toPromise().then(businessPdf => {
          const createdBusinessNode: BusinessNode = {
            _id: businessPdf.pdfId,
            isTop: false,
            expandable: false,
            name: businessPdf.filename,
            contentType: businessPdf.contentType,
            pdfId: businessPdf._id,
            level: 1,
          }
          this.treeControl.dataNodes.splice(nodeIndex + 1, 0, createdBusinessNode);
        });
        promises.push(promise);
      }
      Promise.all(promises).then(() => {
        console.log(this.treeControl.dataNodes);
        const isExpanded = this.treeControl.isExpanded(businessNode);
        if (isExpanded) {
          this.treeControl.collapse(businessNode);
          this.treeControl.expand(businessNode);
        } else {
          this.treeControl.toggle(businessNode);
        }
      });
      input.value = '';
    }
  }

}
