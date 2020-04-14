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
    return this.api.post<So[]>(`http://localhost:8083/lrcServer/SO/${id}/AddL`,sos);
  }
  addSo(id:String,so: So): Observable<So>{
    return this.api.post<So>(`http://localhost:8083/lrcServer/SO/${id}/Add`,so);
  }
  deleteSo(id:number){
    this.api.delete(`http://localhost:8083/lrcServer/SO/${id}/delete`);
  }
  editSo(id:String,so:So){
    return this.api.put<So>(`http://localhost:8083/lrcServer/SO/${id}/Update`,so);
  }
}