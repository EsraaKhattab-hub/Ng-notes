import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotesService } from './../../../shared/services/notes.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-notes-show',
  templateUrl: './notes-show.component.html',
  styleUrls: ['./notes-show.component.scss']
})
export class NotesShowComponent implements OnInit {
  @Input() itemId:any;
  addForm:FormGroup | undefined;
  itemDetails={};
  @Output() items = new EventEmitter<any>();
  constructor(
    private ngModel:NgForm,
    private fb:FormBuilder,
    private notesService:NotesService,
    private toastr:ToastrService ) { }

  ngOnInit(): void {
    this.buildAddForm();
    this.getItemDetails(this.itemId);
  }
  buildAddForm(){
    this.addForm = this.fb.group({
      id:'',
      title:[null,Validators.required],
      description:[null,Validators.required]
    });
  }

  getItemDetails(id: any){
    this.notesService.getItem(id).subscribe(res =>{
      this.itemDetails = res;
      this.addForm?.patchValue({
        title:res.title,
        description:res.description
      });
    });
  }
  
  onSubmit(id:any) {
    if(id === ''){
      this.addItem(this.addForm?.value);
    }else{
      this.updateItem(this.addForm?.value,id);
    }

}
addItem(data: any){
  this.notesService.add(data).subscribe(
    res =>{
      this.toastr.success('Item add successfully','Success');
      this.getItems();
    },
    error =>
    {
      this.toastr.error(error,'Error');
    }
  );
}

updateItem(data: any,id:any){
  this.notesService.update(data,id).subscribe(
    res =>{
      this.toastr.success('Item updated successfully','Success');
      this.getItems();
    },
    error =>
    {
      this.toastr.error(error,'Error');
    }
  );
}
//get items after on submit
getItems(){
  this.notesService.getAll().subscribe(res =>{
    this.items.emit(res);
  });
}

}
