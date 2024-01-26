import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { brand } from 'src/app/models/brand';
import { category } from 'src/app/models/category';
import { items } from 'src/app/models/items';
import { updateItems } from 'src/app/models/updateItem';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.scss']
})
export class AddItemsComponent {
  addForm!: FormGroup;
  brandList: brand[] = [];
  cateogoryList: category[] = [];
  btnName: string = 'Add';
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddItemsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private http: HttpClient,
    private dialog: MatDialog
  ){}
  ngOnInit(){
    this.addForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      category: ['', [Validators.required]],
      quantity: ['', [Validators.required]]
    });
    if(this.data) {
      console.log(this.data);
      this.btnName = this.data.type;
      if(this.data.brand) {
        this.brandList = this.data.brand;
      }
      if(this.data.type == 'Update'){
        this.addForm.patchValue(this.data.form);
        // this.addForm.controls['brand'].setValue({value: this.data.form.brandId, title: this.data.form.brandName});
        this.addForm.controls['brand'].setValue(this.data.form.brandId);
        this.http.get<category[]>(environment.local + `/Product/getCategoriesbyId?id=${this.data.form.brandId}`).subscribe((res: category[]) => {
          this.cateogoryList =  res;
          this.addForm.controls['category'].setValue(this.data.form.categoryId);
        })
      }
    }
  }
  ngAfterViewInit(){
    this.addForm.controls['brand'].valueChanges.subscribe((res) => {
      console.log(res);
      this.http.get<category[]>(environment.local + `/Product/getCategoriesbyId?id=${res}`).subscribe((res: category[]) => {
        this.cateogoryList =  res;
      })
    })
  }
  addorUpdateItems(){
    if(this.data.type == 'Add') {
      this.addItems();
    } else if(this.data.type == 'Update') {
      this.updateItems();
    }
  }
  addItems()
  {
    this.http.post(environment.local + '/Product/AddItems', this.createRequestForAddItems()).subscribe((res: any) => {
      console.log(res);
      if(res.status == 1)
      {
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '30%',
          height: '20%',
          data: {
            type: 'success',
            message: res.message
          }
        });
        dialogRef.afterClosed().subscribe((res) => {
          this.dialogRef.close({status: 1});
        })
      }
    })
  }
  updateItems() {
    this.http.post(environment.local + '/Product/UpdateItem', this.createRequestForUpdateItems()).subscribe((res: any) => {
      console.log(res);
      if(res.status == 1)
      {
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '30%',
          height: '20%',
          data: {
            type: 'success',
            message: res.message
          }
        });
        dialogRef.afterClosed().subscribe((res) => {
          this.dialogRef.close({status: 1});
        })
      }
    }, (error) => {
      console.log(error);
    })
  }


  createRequestForAddItems(): items{
    let brandIndex = this.brandList.findIndex((i) => { return i.id == this.addForm.value.brand});
    let categoryIndex = this.cateogoryList.findIndex((i) => { return i.id == this.addForm.value.category});
    var request: items = {
      name: this.addForm.value.name,
      description: this.addForm.value.description,
      price: this.addForm.value.price.toString(),
      brandId: this.addForm.value.brand,
      brandName: this.brandList[brandIndex].name,
      categoryId: this.addForm.value.category,
      categoryName: this.cateogoryList[categoryIndex].name,
      quantity: this.addForm.value.quantity
    };
    return request;
  }

  createRequestForUpdateItems(): updateItems {
    let brandIndex = this.brandList.findIndex((i) => { return i.id == this.addForm.value.brand});
    let categoryIndex = this.cateogoryList.findIndex((i) => { return i.id == this.addForm.value.category});
    var request: updateItems = {
      name: this.addForm.value.name,
      description: this.addForm.value.description,
      price: this.addForm.value.price.toString(),
      brandId: this.addForm.value.brand,
      brandName: this.brandList[brandIndex].name,
      categoryId: this.addForm.value.category,
      categoryName: this.cateogoryList[categoryIndex].name,
      quantity: this.addForm.value.quantity,
      id: this.data.form.id
    };
    console.log(request);
    return request;
  }
  compareFn(x: any, y: any): boolean {
    return x && y ? x.id === y.id : x === y;
    }
}
