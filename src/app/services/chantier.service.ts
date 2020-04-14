import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, observable } from 'rxjs';
import { Chantier } from '../interfaces/chantier';
import { Decomptes } from '../interfaces/decomptes';
import { DO } from '../interfaces/do';
import { LocationCh } from '../interfaces/location-ch';
import { ActivatedRoute, Router } from '@angular/router';
import { BesoinT } from '../interfaces/besoin-t';
import { AchatMaterielCh } from '../interfaces/achat-materiel-ch';
import { Entretien } from '../interfaces/entretien';
import { Reparation } from '../interfaces/reparation';

@Injectable({
  providedIn: 'root'
})
export class ChantierService {

  private chantier= new BehaviorSubject<Chantier>(null);
  currentChantier = this.chantier.asObservable();

  private infoChantier= new BehaviorSubject<{
    addD: boolean;
    addB: boolean;
    addE: boolean;
    addP: boolean;
    addEn: boolean;
    addR: boolean;
    addA: boolean;
    select: number;}>({
      addD: false,
      addB: false,
      addE: false,
      addP: false,
      addEn: false,
      addR: false,
      addA: false,
      select: 0,
  });
  currentInfo = this.infoChantier.asObservable();

  constructor(private http: HttpClient,private router: Router) { }

  setInfo(i : {addD: boolean; addB: boolean; addE: boolean; addP: boolean; addEn: boolean; addR: boolean; addA: boolean; select: number;}){
      this.infoChantier.next(i);
  }

  getChantiers(): Observable<Chantier[]>{
    return this.http.get<Chantier[]>('http://localhost:8083/lrcServer/Chantiers/All');
  }

  addChantier(ch:Chantier): Observable<Chantier>{
    return this.http.post<Chantier>('http://localhost:8083/lrcServer/Chantiers/Add',ch);
  }

  editChantier(ch:Chantier): Observable<Chantier>{
    return this.http.put<Chantier>('http://localhost:8083/lrcServer/Chantiers/Edit',ch);
  }

  deleteChantier(id:string): Observable<boolean>{
    return this.http.delete<boolean>(`http://localhost:8083/lrcServer/Chantiers/delete/${id}`);
  }

  getChantier(id:string){
    return this.http.get<Chantier>(`http://localhost:8083/lrcServer/Chantiers/${id}`).subscribe(dataN => {
      this.chantier.next(dataN);
  }); 
  }
  getChantierR(id:string){
    return this.http.get<Chantier>(`http://localhost:8083/lrcServer/Chantiers/${id}`).subscribe(dataN => {
      this.chantier.next(dataN);
        this.router.navigate(['Chantiers/'+dataN.numCh]);
  }); 
  }

  addDecomptes(id:string,d:Decomptes): Observable<Decomptes>{
    return this.http.post<Decomptes>(`http://localhost:8083/lrcServer/Decomptes/Add/${id}`,d);
  }
  addDO(id:number,d:DO): Observable<DO>{
    return this.http.post<DO>(`http://localhost:8083/lrcServer/Dos/add/${id}`,d);
  }
  editDO(id:number,d:DO): Observable<DO>{
    return this.http.put<DO>(`http://localhost:8083/lrcServer/Dos/edit/${id}`,d);
  }


  deleteDecomptes(d:Decomptes){
    this.http.delete(`http://localhost:8083/lrcServer/Decomptes/delete/${d.idD}`);
  }

  addLoc(id :string,loc :LocationCh[]){
    this.http.post<LocationCh[]>(`http://localhost:8083/lrcServer/LocationsChantier/add/${id}`,loc).subscribe(data=> {
      this.getChantier(id);
    });
  }

  editLoc(loc :LocationCh): Observable<LocationCh>{
    return this.http.put<LocationCh>(`http://localhost:8083/lrcServer/LocationsChantier/edit`,loc);
  }

  deleteLoc(loc: LocationCh): Observable<boolean>{
    return this.http.delete<boolean>(`http://localhost:8083/lrcServer/LocationsChantier/delete/${loc.idLCH}`);
  }

  addBT(id :string,bt: BesoinT): Observable<BesoinT>{
    return this.http.post<BesoinT>(`http://localhost:8083/lrcServer/BT/Add/${id}`,bt);
  }

  editBT(id:String,bt: BesoinT){
    return this.http.put<BesoinT>(`http://localhost:8083/lrcServer/BT/Edit/${id}`,bt);
  }

  deleteBT(id: number){
    return this.http.delete(`http://localhost:8083/lrcServer/BT/delete/${id}`);
  }

  addAchat(id: string,ac: AchatMaterielCh): Observable<AchatMaterielCh>{
    return this.http.post<AchatMaterielCh>(`http://localhost:8083/lrcServer/AchatMateriaux/${id}/ch/add`,ac);
  }

  deleteAchat(id:number){
    return this.http.delete(`http://localhost:8083/lrcServer/AchatMateriaux/delete/${id}`);
  }
  
  editAchat(id: string,en: AchatMaterielCh): Observable<AchatMaterielCh>{
    return this.http.put<AchatMaterielCh>(`http://localhost:8083/lrcServer/AchatMateriaux/ch/edit/${id}`,en);
  }

  addEntretien(id: string,en: Entretien[]): Observable<Entretien[]>{
    return this.http.post<Entretien[]>(`http://localhost:8083/lrcServer/Entretiens/add/${id}`,en);
  }

  editEntretien(id: string,en: Entretien): Observable<Entretien>{
    return this.http.put<Entretien>(`http://localhost:8083/lrcServer/Entretiens/edit/${id}`,en);
  }

  deleteEntretien(id: number){
    return this.http.delete(`http://localhost:8083/lrcServer/Entretiens/delete/${id}`);
  }

  addReparation(id: string,en: Reparation[]): Observable<Reparation[]>{
    return this.http.post<Reparation[]>(`http://localhost:8083/lrcServer/Reparations/add/${id}`,en);
  }

  editReparation(id: string,en: Reparation): Observable<Reparation>{
    return this.http.put<Reparation>(`http://localhost:8083/lrcServer/Reparations/edit/${id}`,en);
  }

  deleteReparation(id: number){
    return this.http.delete(`http://localhost:8083/lrcServer/Reparations/delete/${id}`);
  }
  
  
}
