import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ConstructionModel } from '../construction.model';
import { ConstructionsService } from '../constructions.service';

@Component({
  selector: 'app-dialog-constructions',
  templateUrl: './dialog-constructions.component.html',
  styleUrls: ['./dialog-constructions.component.sass']
})
export class DialogConstructionsComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly constructionsService: ConstructionsService,
    private readonly navigationService: NavigationService,
  ) { }

  public constructions: ConstructionModel[] = [];
  public formGroup: FormGroup = this.formBuilder.group({
    key: [ null, Validators.required ],
  });

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.navigationService.loadBarStart();
      const key = this.formGroup.get('key')?.value;
      this.formGroup.reset();
      this.constructionsService.getConstructionsByPageKey(1, 100, key, {}).subscribe(constructions => {
        this.navigationService.loadBarFinish();
        this.constructions = constructions;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }
}
