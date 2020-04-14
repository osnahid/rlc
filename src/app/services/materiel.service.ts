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
    return this.http.get<Materiel[]>("http://localhost:8083/lrcServer/Materiels/All");
  }

  addMateriel(m: Materiel): Observable<Materiel>{
    return this.http.post<Materiel>("http://localhost:8083/lrcServer/Materiels/Add",m);
  }

  editMateriel(m: Materiel): Observable<Materiel>{
    return this.http.put<Materiel>("http://localhost:8083/lrcServer/Materiels/edit",m);
  }

  getCatMat(): Observable<CategorieMateriel[]>{
    return this.http.get<CategorieMateriel[]>("http://localhost:8083/lrcServer/Materiels/Categories");
  }
  addCatMat(cm: CategorieMateriel): Observable<CategorieMateriel>{
    return this.http.post<CategorieMateriel>("http://localhost:8083/lrcServer/Materiels/Categories/add",cm);
  }
  deleteMateriel(m: Materiel){
    return this.http.delete(`http://localhost:8083/lrcServer/Materiels/delete/${m.idMateriel}`);
  }
}
