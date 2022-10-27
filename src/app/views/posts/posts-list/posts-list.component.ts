import { Component, OnInit} from '@angular/core';
import { PostsService } from 'src/app/shared/services/posts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  items:any=[];
  modelService: any;
  constructor(
    private PostsService:PostsService,
    private modalService: NgbModal,
    private Toastr:ToastrService
      ) { }

  ngOnInit(): void {
    this.getAll();
  }
  
  //get all posts
  getAll(){
    this.PostsService.getAll().subscribe(res=>{
      // console.log(res);
      this.items = res;
    });
  }
  open(content: any) {
    this.modalService.open(content);
  }
  //delete item
  deleteItem(model: any,id: any ){
    this.modalService.open(model).result.then((result: any) =>{
          this.PostsService.delete(id).subscribe(res=>{
          this.Toastr.success('Item deleted successfuly','Success',{timeOut:3000,closeButton:true,progressBar:true});
      console.log(res);
      this.getAll();
    },
    err =>{
      this.Toastr.error(err.statusText,'Error!',{timeOut:3000,closeButton:true,progressBar:true});
      console.log(err);
    });
      // console.log(result);
      // console.log(id);
    },
    reason=>{
      console.log(reason);
    });

  }
}
