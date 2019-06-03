import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EtudePrix } from '../interfaces/etude-prix';
import { LocationEp } from '../interfaces/locationEp';
import { AchatMateriel } from '../interfaces/achat-materiel';

@Injectable({
  providedIn: 'root'
})
export class EtudePrixService {

  constructor(private http: HttpClient) { }

  addEtudePrix(id: String,et: EtudePrix): Observable<EtudePrix>{
    return this.http.post<EtudePrix>(`http://localhost:8080/${id}/EtudePrix/Add`,et);
  }
  addLocation(id: number,l: LocationEp): Observable<LocationEp>{
   return this.http.post<LocationEp>(`http://localhost:8080/Location/${id}/Add`,l);
  }
  addAchatMateriel(id: number,am: AchatMateriel): Observable<AchatMateriel>{
    return this.http.post<AchatMateriel>(`http://localhost:8080/AchatMateriels/${id}/Add`,am);
  }
  deleteEt(id:number): Observable<Boolean>{
    return this.http.delete<Boolean>(`http://localhost:8080/EtudePrix/delete/${id}`);
  }
  
}

