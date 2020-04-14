import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personnel } from '../interfaces/personnel';


@Injectable({
  providedIn: 'root'
})
export class PersonnelService {

  constructor(private api: HttpClient) { }

  getPersonnels(): Observable<Personnel[]>{
    return this.api.get<Personnel[]>("http://localhost:8083/lrcServer/Personnels/All");
  }

  addPersonnel(p:Personnel): Observable<Personnel>{
    return this.api.post<Personnel>("http://localhost:8083/lrcServer/Personnels/Add",p);
  }

  editPersonnel(p:Personnel): Observable<Personnel>{
    return this.api.put<Personnel>("http://localhost:8083/lrcServer/Personnels/edit",p);
  }

  deletePersonnel(id:number): Observable<boolean>{
    return this.api.delete<boolean>(`http://localhost:8083/lrcServer/Personnels/delete/${id}`);
  }
}
