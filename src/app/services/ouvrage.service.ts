import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ouvrage } from '../interfaces/ouvrage';

@Injectable({
  providedIn: 'root'
})
export class OuvrageService {

  constructor(private api : HttpClient) { }

  addOuvrage(id: number,o: Ouvrage): Observable<Ouvrage>{    
    return this.api.post<Ouvrage>(`http://localhost:8083/lrcServer/Ouvrages/${id}/add`,o);
  }

  getOuvrage(): Observable<Ouvrage[]>{
    return this.api.get<Ouvrage[]>('http://localhost:8083/lrcServer/Ouvrages/All');
  }
  deleteOuvrage(id: number){
    return this.api.delete(`http://localhost:8083/lrcServer/Ouvrages/delete/${id}`);
  }
}
