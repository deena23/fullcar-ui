import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  hide: boolean = true;
  loginForm!: FormGroup;
  apiLoader: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private _authService: AuthService,
    private matDialog: MatDialog){}

  ngOnInit(){
    if(this._authService.isLoggedIn()){
      this.router.navigate(['/Admin']);
    }
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  ngAfterViewInit()
  {

  }

  formSubmit(){
    this.apiLoader = true;
    var resonse = this.http.post('https://localhost:44368/api/Login', this.loginForm.value);
    resonse.subscribe((res: any) => {
      console.log(res);
      if(res.response.status == 1) {
        localStorage.setItem('Token', res.token);
        localStorage.setItem('Role', res.response.roleId);
        localStorage.setItem('User', res.response.id);
        this.router.navigate(['/Admin']);
        this.apiLoader = false;
      } else{
        this.apiLoader = false;
      }
    }, 
    (error) => {
      this.apiLoader = false;
      console.log(error);
      const dialogRef = this.matDialog.open(DialogComponent, {
        width: '30%',
        height: '20%',
        data: {
          type: 'error',
          message: error.error
        }
      });
      dialogRef.afterClosed().subscribe(res => {
        this.loginForm.reset();
      })
    })
  }
}
