import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddItemsComponent } from './sub-modules/add-items/add-items.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { brand } from 'src/app/models/brand';
import { items } from 'src/app/models/items';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { AddBrandComponent } from './sub-modules/add-brand/add-brand.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  dataSource: any = [];
  columnDetails: any = [
    {
      key: 'position',
      value: 'Position'
    },
    {
      key: 'name',
      value: 'Name'
    },
    {
      key: 'description',
      value: 'Description'
    },
    {
      key: 'price',
      value: 'Price'
    },
    {
      key: 'brandName',
      value: 'Brand'
    },
    {
      key: 'categoryName',
      value: 'Category'
    },
    {
      key: 'quantity',
      value: 'Quantity'
    },
    {
      key: 'icon',
      value: 'Edit/Delete'
    }
  ]
  displayedColumns: string[] = ['position', 'name', 'description', 'price', 'brandName', 'categoryName', 'quantity', 'icon'];
  brandList: brand[] = [];
  constructor(
    private dialog: MatDialog,
    private http: HttpClient
  ){}

  ngOnInit(){
    this.loadBrand();
    this.loadItems();
  }

  ngAfterViewInit()
  {

  }

  addItems(){
    const dialogRef = this.dialog.open(AddItemsComponent, {
      width: "25%",
      height: "80%",
      data: {
        type: 'Add',
        brand: this.brandList
      }
    });
    dialogRef.afterClosed().subscribe((res) => {
      if(res.status == 1){
        this.loadItems();
      }
    })
  }
  loadBrand() {
    this.http.get<brand[]>(environment.local + '/Product/GetBrands').subscribe((result: brand[]) => {
      console.log(result);
      this.brandList = result;
    }, (error) => {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '30%',
        height: '20%',
        data: {
          type: 'error',
          message: error.error
        }
      });
    });
  }
  loadItems()
  {
    this.http.get<items[]>(environment.local + '/Product/GetProductDetails').subscribe((result: items[]) => {
      console.log(result);
      this.dataSource = result;
      this.dataSource.forEach((i: any, index: any) => {
        i.position = index + 1;
      });
      console.log(this.dataSource);
    }, (error) => {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '30%',
        height: '20%',
        data: {
          type: 'error',
          message: error.error
        }
      });
    })
  }

  editItem(data: any){
    console.log(data);
    const dialogRef = this.dialog.open(AddItemsComponent, {
      width: "25%",
      height: "80%",
      data: {
        type: 'Update',
        form: data,
        brand: this.brandList
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadItems();
    });
  }

  deleteItem(data: any) {
    console.log(data);
    this.http.post(environment.local + `/Product/DeleteItem/?id=${data.id}`, '').subscribe((res: any) => {
      console.log(res);
      if(res.status == 1) {
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '30%',
          height: '20%',
          data: {
            type: 'success',
            message: res.message
          }
        });
        dialogRef.afterClosed().subscribe(() => {
          this.loadItems();
        });
      }
    }, (error) => {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '30%',
        height: '20%',
        data: {
          type: 'error',
          message: error.error
        }
      });
    })
  }

  addBrand() {
    const dialogRef = this.dialog.open(AddBrandComponent, {
      width: "30%",
      height: "70%"
    })
  }

  addCategory() {

  }
}
