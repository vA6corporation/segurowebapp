import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DeviceModel } from 'src/app/users/user.model';
import { DevicesService } from '../devices.service';

@Component({
  selector: 'app-dialog-devices',
  templateUrl: './dialog-devices.component.html',
  styleUrls: ['./dialog-devices.component.sass']
})
export class DialogDevicesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly devices: DeviceModel[],
    private readonly devicesService: DevicesService,
    private readonly navigationService: NavigationService,
    private readonly matDialog: MatDialogRef<DialogDevicesComponent>
  ) { }

  ngOnInit(): void {

  }

  onDelete(deviceId: string) {
    const ok = confirm('Estas seguro de eliminar?...');
    if (ok) {
      this.devicesService.delete(deviceId).subscribe(() => {
        this.navigationService.showMessage('Eliminado correctamente');
        this.matDialog.close(true);
      });
    }
  }

  onUpdate(deviceId: string) {
    this.devicesService.update(deviceId).subscribe(() => {
      this.navigationService.showMessage('Equipo autorizado');
      this.matDialog.close(true);
    });
  }

}
