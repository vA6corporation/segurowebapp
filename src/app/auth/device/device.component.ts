import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { OfficeModel } from '../office.model';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.sass']
})
export class DeviceComponent implements OnInit {

  constructor(
    private readonly navigationService: NavigationService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  public deviceId = localStorage.getItem('deviceId');
  public deviceIdTwo = '';

  ngOnInit(): void {
    this.navigationService.setTitle('Dispositivo no autorizado');
    const start = navigator.userAgent.indexOf('(');
    const end = navigator.userAgent.indexOf(')');
    const name = navigator.userAgent.substring(start + 1, end);
    if (this.deviceId) {
      this.deviceIdTwo = this.deviceId.slice(30);
    }
    this.authService.handleAuth().subscribe(auth => {
      const device = {
        deviceId: this.deviceId,
        name,
        userId: auth.user._id,
      }
      if (this.deviceId) {
        this.authService.createDevice(device).subscribe(() => {
          
        });
      }
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
