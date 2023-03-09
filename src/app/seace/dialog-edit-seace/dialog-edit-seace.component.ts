import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';
import { SeaceDataModel } from '../seace-data.model';
import { SeaceService } from '../seace.service';

@Component({
  selector: 'app-dialog-edit-seace',
  templateUrl: './dialog-edit-seace.component.html',
  styleUrls: ['./dialog-edit-seace.component.sass']
})
export class DialogEditSeaceComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly seaceData: SeaceDataModel,
    private readonly navigationService: NavigationService,
    private readonly workersService: WorkersService,
    private readonly seaceService: SeaceService,
    private readonly formBuilder: FormBuilder,
    private readonly matDialogRef: MatDialogRef<DialogEditSeaceComponent>,
  ) { }

  public workers: WorkerModel[] = [];
  public formGroup: UntypedFormGroup = this.formBuilder.group({
    workerId: [ null, Validators.required ],
    observations: null,
  });

  private handleWorkers$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleWorkers$.unsubscribe();
  }

  ngOnInit(): void {
    this.handleWorkers$ = this.workersService.handleWorkers().subscribe(workers => {
      this.workers = workers;
    });

    console.log(this.seaceData.workerId);

    this.formGroup.patchValue(this.seaceData);
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.navigationService.loadBarStart();
      this.seaceService.update(this.formGroup.value, this.seaceData._id).subscribe(() => {
        this.navigationService.loadBarFinish();
        this.matDialogRef.close(true);
      });
    }
  }

}
