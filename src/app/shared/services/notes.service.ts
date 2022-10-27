import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'any'
})
export class NotesService {

  constructor(private http:HttpClient) { }
  //get all items
  getAll(){
    return this.http.get(`${environment.apiUrl}/notes`);
  }
  //delete item
  delete(id: any){
    return this.http.delete(`${environment.apiUrl}/notes/${id}`);
  }
  //add new item
  add(data: any){
    return this.http.post(`${environment.apiUrl}/notes`,data);
  }
  //get item
  getItem(id: any){
    return this.http.get<any>(`${environment.apiUrl}/notes/${id}`);
  }

  //edit item
  update(data: any,id: any){
    return this.http.put(`${environment.apiUrl}/notes/${id}`,data);
  }
}
