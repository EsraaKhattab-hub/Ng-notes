import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/shared/services/posts.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup , FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {
  
  itemId:number | undefined;
  itemDetails ={};
  editForm = new FormGroup({
    title: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
  });
  submitted :boolean | undefined;
  constructor(
    private router: Router,
    private toastr:ToastrService,
    private PostsService:PostsService,
    private route:ActivatedRoute,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    //get item data id 
    this.route.params.subscribe(params =>{
      this.itemId=params['id'];
      console.log(params['id']);
    this.PostsService.getItem(params['id']).subscribe(res =>{
      this.itemDetails =res;
      console.log(this.itemDetails);
      this.editForm.patchValue({
        title:res.title,
        description:res.description
      });
    });
    });
  }
  get f(){return this.editForm.controls;}
  onSubmit() {
    this.submitted=true;
    if(this.editForm.invalid){
      return;
    }
    this.PostsService.update(this.editForm.value,this.itemId).subscribe(
      res=>{
        this.toastr.success('Item updated successfuly','Success',{timeOut:3000,closeButton:true,progressBar:true});
        this.router.navigate(['admin/posts']);
      },
      err=>{
        this.toastr.error(err.statusText,'Error!',{timeOut:3000,closeButton:true,progressBar:true});

      }
    );

    }
 

}
