import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ShareholderModel } from '../shareholder.model';
import { ShareholdersService } from '../shareholders.service';

@Component({
  selector: 'app-dialog-shareholders',
  templateUrl: './dialog-shareholders.component.html',
  styleUrls: ['./dialog-shareholders.component.sass']
})
export class DialogShareholdersComponent implements OnInit {

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly shareholdersService: ShareholdersService,
    private readonly navigationService: NavigationService,
  ) { }

  public shareholders: ShareholderModel[] = [];
  public formGroup: UntypedFormGroup = this.formBuilder.group({
    key: [ null, Validators.required ],
  });

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.navigationService.loadBarStart();
      const key = this.formGroup.get('key')?.value;
      this.formGroup.reset();
      this.shareholdersService.getShareholdersByKey(key).subscribe(shareholders => {
        this.navigationService.loadBarFinish();
        this.shareholders = shareholders;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}
