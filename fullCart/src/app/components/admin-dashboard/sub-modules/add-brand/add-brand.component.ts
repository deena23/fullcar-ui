import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { brand } from 'src/app/models/brand';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})
export class AddBrandComponent {
  addBrandForm!: FormGroup;
  btnName: string = 'Add';
  dataSource: any[] = [];
  displayedColumns: string[] = ['name', 'icon'];
  brandList: brand[] = [];
  editFlag: boolean = false;
  currentBrand!: number;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dialog: MatDialog 
  ) {}

  ngOnInit(){
    this.addBrandForm = this.formBuilder.group({
      brandName: ['', [Validators.required]]
    });
    this.loadBrand();
  }

  ngAfterViewInit() {
    this.addBrandForm.controls['brandName'].valueChanges.subscribe((res) => {
      if(res == '') {
        this.editFlag = false;
        this.btnName = 'Add';
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
  addorUpdateBrand(){
    if(!this.editFlag) {
      this.addBrand();
    } else {
      this.updateBrand();
    }
  }
  addBrand() {
    this.http.post(environment.local + `/Product/AddBrand?brandName=${this.addBrandForm.controls['brandName'].value}`, '').subscribe((res: any) => {
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
          this.addBrandForm.reset();
          this.loadBrand();
        })
      }
    })
  }
  updateBrand() {
    var request: brand = {
      id: this.currentBrand,
      name: this.addBrandForm.controls['brandName'].value
    };
    this.http.post(environment.local + '/Product/UpdateBrand', request).subscribe((response: any) => {
      if(response.status == 1) {
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '30%',
          height: '20%',
          data: {
            type: 'success',
            message: response.message
          }
        });
        dialogRef.afterClosed().subscribe(() => {
          this.addBrandForm.reset();
          this.loadBrand();
        })
      }
    })
  }
  editBrand(element: any) {
    console.log(element);
    this.currentBrand = element.id;
    this.editFlag = true;
    this.btnName = 'Update';
    this.addBrandForm.controls['brandName'].setValue(element.name);
  }
}
