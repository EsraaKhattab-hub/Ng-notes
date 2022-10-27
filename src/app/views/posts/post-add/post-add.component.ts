import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/shared/services/posts.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup , FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss']
})
export class PostAddComponent implements OnInit {


  profileForm = new FormGroup({
    title: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
  });
  submitted :boolean | undefined;
  constructor(
    private router: Router,
    private toastr:ToastrService,
    private PostsService:PostsService, 
  ) { }
  ngOnInit(){}

  get f(){return this.profileForm.controls;}

  onSubmit() {
    this.submitted=true;
    if(this.profileForm.invalid){
      return;
    }
    this.PostsService.add(this.profileForm.value).subscribe(
      res=>{
        this.toastr.success('Item add successfuly','Success',{timeOut:3000,closeButton:true,progressBar:true});
        this.router.navigate(['admin/posts']);
      },
      err=>{
        this.toastr.error(err.statusText,'Error!',{timeOut:3000,closeButton:true,progressBar:true});

      }
    );


    // console.warn(this.profileForm.value);
    // this.submitted = true;
    // if (this.profileForm.valid) {
    //   console.log('Success')
    // }

    // if (this.profileForm.invalid) {
    //  console.log('Error')
    //   };
    //   return;
    }
}

