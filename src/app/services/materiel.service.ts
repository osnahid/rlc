import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Materiel } from '../interfaces/materiel';
import { CategorieMateriel } from '../interfaces/categorie-materiel';

@Injectable({
  providedIn: 'root'
})
export class MaterielService {

  constructor(private http: HttpClient) { }

  getMateriel(): Observable<Materiel[]>{
    return this.http.get<Materiel[]>("http://localhost:8080/Materiels/All");
  }

  addMateriel(m: Materiel): Observable<Materiel>{
    return this.http.post<Materiel>("http://localhost:8080/Materiels/Add",m);
  }

  editMateriel(m: Materiel): Observable<Materiel>{
    return this.http.put<Materiel>("http://localhost:8080/Materiels/edit",m);
  }

  getCatMat(): Observable<CategorieMateriel[]>{
    return this.http.get<CategorieMateriel[]>("http://localhost:8080/Materiels/Categories");
  }
}
