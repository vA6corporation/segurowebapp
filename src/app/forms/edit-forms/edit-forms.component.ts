import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-forms',
  templateUrl: './edit-forms.component.html',
  styleUrls: ['./edit-forms.component.sass']
})
export class EditFormsComponent implements OnInit {

  constructor() { }

  formForm: FormGroup;

  ngOnInit(): void {
    // this.formForm = this.formForm.group({

    // });
  }

  onSubmit() {

  }

}
