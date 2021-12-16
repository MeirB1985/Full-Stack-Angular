import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import ProductModel from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';

export interface DialogData {
  product: ProductModel;
  price: number;
  name: string;
  imageName: string;
  quantity: number;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html'
})

export class DialogComponent {

  public imageUrl = environment.productImagesUrl;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}