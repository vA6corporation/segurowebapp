import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-sheet-constructions',
  templateUrl: './sheet-constructions.component.html',
  styleUrls: ['./sheet-constructions.component.sass']
})
export class SheetConstructionsComponent implements OnInit {

  constructor(
    private readonly bottomSheetRef: MatBottomSheetRef<SheetConstructionsComponent>,
  ) { }

  @Output() 
  public onDialogOne = new EventEmitter<void>();
  @Output() 
  public onDialogTwo = new EventEmitter<void>();

  ngOnInit(): void {
  }

  onDialogOneClick(): void {
    this.onDialogOne.emit();
    this.bottomSheetRef.dismiss();
  }

  onDialogTwoClick(): void {
    this.onDialogTwo.emit();
    this.bottomSheetRef.dismiss();
  }

}
