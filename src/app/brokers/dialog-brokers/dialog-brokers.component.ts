import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { BrokerModel } from '../broker.model';
import { BrokersService } from '../brokers.service';

@Component({
  selector: 'app-dialog-brokers',
  templateUrl: './dialog-brokers.component.html',
  styleUrls: ['./dialog-brokers.component.sass']
})
export class DialogBrokersComponent implements OnInit {

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly brokersService: BrokersService,
    private readonly navigationService: NavigationService,
  ) { }

  public brokers: BrokerModel[] = [];
  public formGroup: UntypedFormGroup = this.formBuilder.group({
    key: [ null, Validators.required ],
  });

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.navigationService.loadBarStart();
      const key = this.formGroup.get('key')?.value;
      this.formGroup.reset();
      this.brokersService.getBrokersByKey(key).subscribe(brokers => {
        this.navigationService.loadBarFinish();
        this.brokers = brokers;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}
