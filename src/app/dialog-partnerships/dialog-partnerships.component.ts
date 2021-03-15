import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Partnership } from 'src/app/partnerships/partnership.model';
import { PartnershipsService } from 'src/app/partnerships/partnerships.service';
import { NavigationService } from '../navigation/navigation.service';

@Component({
  selector: 'app-dialog-partnerships',
  templateUrl: './dialog-partnerships.component.html',
  styleUrls: ['./dialog-partnerships.component.sass']
})
export class DialogPartnershipsComponent implements OnInit {

  constructor(
    private partnershipsService: PartnershipsService,
    private navigationService: NavigationService,
    private matSnackBar: MatSnackBar,
  ) { 
    this.formGroup = this.formBuilder.group({
      key: [ null, Validators.required ],
    });
  }

  public partnerships: Partnership[] = [];
  private formBuilder: FormBuilder = new FormBuilder();
  public formGroup: FormGroup;

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.navigationService.loadBarStart();
      const key = this.formGroup.get('key')?.value;
      this.formGroup.reset();
      this.partnershipsService.getPartnershipsByAny(key).subscribe(partnerships => {
        this.navigationService.loadBarFinish();
        this.partnerships = partnerships;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.matSnackBar.open(error.error.message, 'Aceptar', {
          duration: 5000,
        });
      });
    }
  }
}
