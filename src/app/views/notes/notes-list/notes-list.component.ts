import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotesService } from 'src/app/shared/services/notes.service';


@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
items:any=[];
closeResult = '';
itemId:any;
searchText= '';
  constructor(
    private  notesService: NotesService,
    private  modelService:NgbModal,
    private  toastr:ToastrService 
  ) { }


  open(content:any, id:any) {
		this.modelService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(reason) => {
			},
			(reason) => {
				// this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log(reason);
			},

		);
    this.itemId=id;
    console.log(id);
	}
  private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}


  ngOnInit(): void {
    this.getAll();
  }
  //get all notes
  getAll(){
    this.notesService.getAll().subscribe(res=>{
      this.items = res;
  });
  }
  deleteItem(model: any,id: any ){
    this.modelService.open(model).result.then((result: any) =>{
          this.notesService.delete(id).subscribe(res=>{
          this.toastr.success('Item deleted successfuly','Success',{timeOut:3000,closeButton:true,progressBar:true});
      console.log(res);
      this.getAll();
    },
    err =>{
      this.toastr.error(err.statusText,'Error!',{timeOut:3000,closeButton:true,progressBar:true});
      console.log(err);
    });
      // console.log(result);
      // console.log(id);
    },
    reason=>{
      console.log(reason);
    });

  }
  //get updated items
  getUpdatedItems(updateditems:any){
    this.items=updateditems;
    this.modelService.dismissAll();

  }

}