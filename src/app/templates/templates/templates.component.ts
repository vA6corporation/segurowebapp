import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.sass']
})
export class TemplatesComponent implements OnInit {

  constructor(
    private readonly navigaionService: NavigationService,
  ) { }

  baseUrl: string = environment.baseUrl;

  ngOnInit(): void {
    this.navigaionService.setTitle('Documentacion');
  }

}
