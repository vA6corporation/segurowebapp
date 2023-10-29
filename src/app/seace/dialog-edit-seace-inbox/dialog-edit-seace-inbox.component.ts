import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SeaceDataModel } from '../seace-data.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { WorkersService } from 'src/app/workers/workers.service';
import { SeaceService } from '../seace.service';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { WorkerModel } from 'src/app/workers/worker.model';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dialog-edit-seace-inbox',
  templateUrl: './dialog-edit-seace-inbox.component.html',
  styleUrls: ['./dialog-edit-seace-inbox.component.sass']
})
export class DialogEditSeaceInboxComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly seaceData: SeaceDataModel,
    private readonly navigationService: NavigationService,
    private readonly workersService: WorkersService,
    private readonly seaceService: SeaceService,
    private readonly formBuilder: FormBuilder,
    private readonly matDialogRef: MatDialogRef<DialogEditSeaceInboxComponent>,
  ) { }

  public workers: WorkerModel[] = [];
  public formGroup: UntypedFormGroup = this.formBuilder.group({
    workerId: null,
    statusCode: '01',
    observations: null,
    managementDate: null,
  });

  private handleWorkers$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleWorkers$.unsubscribe();
  }

  ngOnInit(): void {
    this.handleWorkers$ = this.workersService.handleWorkers().subscribe(workers => {
      this.workers = workers;
    });
    this.formGroup.patchValue(this.seaceData);
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.navigationService.loadBarStart();
      this.seaceService.update(this.formGroup.value, this.seaceData._id).subscribe(() => {
        this.navigationService.loadBarFinish();
        this.matDialogRef.close(true);
      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
    }
  }

}
