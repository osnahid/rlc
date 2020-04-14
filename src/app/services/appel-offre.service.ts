import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { AppelOffre } from '../interfaces/appel-offre';
import { InstallationChantier } from '../interfaces/installation-chantier';
import { Router } from '@angular/router';
import { EtudePrix } from '../interfaces/etude-prix';
import { AchatMateriel } from '../interfaces/achat-materiel';
import { LocationEp } from '../interfaces/locationEp';



@Injectable({
  providedIn: 'root'
})
export class AppelOffreService {
  private navAO = new BehaviorSubject<{displayAL:boolean;displayAEP:boolean;displayIC:boolean;select:number}>({displayAL:false,displayAEP:false,displayIC:false,select:0});
  info = this.navAO.asObservable();
  private ao = new BehaviorSubject<AppelOffre>(null);
  currentAO = this.ao.asObservable();

  constructor(private api : HttpClient,private router: Router) { }

  getAO(id: string){
    this.api.get<AppelOffre>(`http://localhost:8083/lrcServer/AppelOffres/${id}`).subscribe(data => this.ao.next(data));
  }

  setInfo(i:{displayAL:boolean;displayAEP:boolean;displayIC:boolean;select:number}){
    this.navAO.next(i);
  }

  getAOS(id: string){
    this.api.get<AppelOffre>(`http://localhost:8083/lrcServer/AppelOffres/${id}`).subscribe(data => {
      this.ao.next(data);
      this.router.navigate(['AppelOffres/'+data.numAO]);
  });
  }

  getAllAO(): Observable<AppelOffre[]>{
    return this.api.get<AppelOffre[]>("http://localhost:8083/lrcServer/AppelOffres/All");
  }

  addAo(ao: AppelOffre): Observable<AppelOffre>{
    return this.api.post<AppelOffre>("http://localhost:8083/lrcServer/AppelOffres/Add",ao);
  }

  editAo(ao: AppelOffre){
    this.api.put<AppelOffre>("http://localhost:8083/lrcServer/AppelOffres/Mod",ao).subscribe(data => 
    this.ao.next(data)
    );
  }

  deleteAo(id: string){
    return this.api.delete<Boolean>(`http://localhost:8083/lrcServer/AppelOffres/${id}/delete`);
  }

  editIc(ic: InstallationChantier,ao: String): Observable<InstallationChantier>{
    return this.api.put<InstallationChantier>(`http://localhost:8083/lrcServer/AppelOffres/${ao}/ic/edit`,ic);
  }

  addIc(ic: InstallationChantier,ao: String): Observable<InstallationChantier>{
    return this.api.post<InstallationChantier>(`http://localhost:8083/lrcServer/AppelOffres/${ao}/ic/add`,ic);
  }

  deleteIc(ic: InstallationChantier): Observable<boolean>{
    return this.api.delete<boolean>(`http://localhost:8083/lrcServer/AppelOffres/ic/delete/${ic.idIC}`);
  }

  addEtudePrix(id: string,et: EtudePrix){
    return this.api.post<EtudePrix>(`http://localhost:8083/lrcServer/EtudePrix/${id}/Add`,et);
  }

  editEtudePrix(id: string,et: EtudePrix){
    return this.api.put<EtudePrix>(`http://localhost:8083/lrcServer/EtudePrix/edit`,et);
  }
  
  deleteEt(id:number): Observable<Boolean>{
    return this.api.delete<Boolean>(`http://localhost:8083/lrcServer/EtudePrix/delete/${id}`);
  }
  addAchatMateriel(idAO: string,id: number,ac: AchatMateriel[]){
    return this.api.post<AchatMateriel[]>(`http://localhost:8083/lrcServer/AchatMateriaux/${id}/et/add`,ac);
  }
  addLocation(idAO: string,id: number,l: LocationEp[]){
    return this.api.post<LocationEp[]>(`http://localhost:8083/lrcServer/Location/${id}/Add`,l);
   }
  editAchatMateriel(ac: AchatMateriel){
    return this.api.post<AchatMateriel>(`http://localhost:8083/lrcServer/AchatMateriaux/et/edit`,ac);
  }
}
