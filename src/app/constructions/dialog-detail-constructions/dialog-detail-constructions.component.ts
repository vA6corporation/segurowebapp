import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { Guarantee } from 'src/app/reports/guarantee.interface';
import { ConstructionModel } from '../construction.model';
import { ConstructionsService } from '../constructions.service';

@Component({
  selector: 'app-dialog-detail-constructions',
  templateUrl: './dialog-detail-constructions.component.html',
  styleUrls: ['./dialog-detail-constructions.component.sass']
})
export class DialogDetailConstructionsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    private readonly constructionId: string,
    private readonly formBuilder: FormBuilder,
    private readonly constructionsService: ConstructionsService,
    private readonly navigationService: NavigationService,
  ) { }

  public guaranties: Guarantee[] = [];
  public formGroup: FormGroup = this.formBuilder.group({
    key: [ null, Validators.required ],
  });

  ngOnInit(): void { 
    this.constructionsService.getGuarantiesByConstructionId(this.constructionId).subscribe(guaranties => {
      console.log(guaranties);
      this.guaranties = guaranties;
    });
  }

  onSubmit(): void {
    // if (this.formGroup.valid) {
    //   this.navigationService.loadBarStart();
    //   const key = this.formGroup.get('key')?.value;
    //   this.formGroup.reset();
    //   this.constructionsService.getConstructionsByKey(key).subscribe(constructions => {
    //     this.navigationService.loadBarFinish();
    //     this.guara = constructions;
    //   }, (error: HttpErrorResponse) => {
    //     this.navigationService.loadBarFinish();
    //     this.navigationService.showMessage(error.error.message);
    //   });
    // }
  }

}
