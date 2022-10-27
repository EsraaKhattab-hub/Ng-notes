import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup , FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router} from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  ;
  submitted:boolean | undefined;
  loading:boolean | undefined;

  signupForm = new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  });

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private authService:AuthService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {

  }
  //convenience getter for easy access to form fields
  get f(){ return this.signupForm?.controls;}

  onSubmit() {
    this.submitted=true;
    if(this.signupForm?.invalid){
      return;
    }
    this.authService.register(this.signupForm?.value).pipe(first()).subscribe(
      data=>{
        this.toastr.success('Signup successfuly','Success');
        this.router.navigate(['/auth/login']);
      },
      error=>{
        this.toastr.error(error,'Error!');
        this.loading =false;

      }
    );

    }
}
