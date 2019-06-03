import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppelOffre } from '../interfaces/appel-offre';
import { InstallationChantier } from '../interfaces/installation-chantier';

@Injectable({
  providedIn: 'root'
})
export class AppelOffreService {

  constructor(private api : HttpClient) { }

  getAO(id: string): Observable<AppelOffre>{
   return this.api.get<AppelOffre>(`http://localhost:8080/AppelOffres/${id}`);
  }
  getAllAO(): Observable<AppelOffre[]>{
    return this.api.get<AppelOffre[]>("http://localhost:8080/AppelOffres/All");
  }
  addAo(ao: AppelOffre): Observable<AppelOffre>{
    return this.api.post<AppelOffre>("http://localhost:8080/AppelOffres/Add",ao);
  }
  editAo(ao: AppelOffre): Observable<AppelOffre>{
    return this.api.post<AppelOffre>("http://localhost:8080/AppelOffres/Mod",ao);
  }
  deleteAo(id: string){
    this.api.delete(`http://localhost:8080/AppelOffres/${id}/delete`);
  }
  editIc(ic: InstallationChantier,ao: String): Observable<InstallationChantier>{
    return this.api.put<InstallationChantier>(`http://localhost:8080/${ao}/ic/edit`,ic);
  }
  addIc(ic: InstallationChantier,ao: String): Observable<InstallationChantier>{
    return this.api.post<InstallationChantier>(`http://localhost:8080/${ao}/ic/add`,ic);
  }
  deleteIc(ic: InstallationChantier): Observable<boolean>{
    return this.api.delete<boolean>(`http://localhost:8080/ic/delete/${ic.idIC}`);
  }
}
