import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { So } from '../interfaces/so';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoService {

  constructor(private api: HttpClient) { }

  addListSo(id:String,sos: So[]): Observable<So[]>{
    return this.api.post<So[]>(`http://localhost:8080/SO/${id}/AddL`,sos);
  }
  addSo(id:String,so: So): Observable<So>{
    return this.api.post<So>(`http://localhost:8080/SO/${id}/Add`,so);
  }
  deleteSo(id:String){
    this.api.delete(`http://localhost:8080/SO/${id}/delete`);
  }
  editSo(so:So){
    this.api.put(`http://localhost:8080/SO/Update`,so);
  }
}