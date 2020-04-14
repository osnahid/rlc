import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categorie } from '../interfaces/categorie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private api : HttpClient) { }

  getCategories(): Observable<Categorie[]>{
    return this.api.get<Categorie[]>("http://localhost:8083/lrcServer/Categories/All");
  }
  addCategorie(c: Categorie): Observable<Categorie>{
    return this.api.post<Categorie>("http://localhost:8083/lrcServer/Categories/add",c);
  }
}