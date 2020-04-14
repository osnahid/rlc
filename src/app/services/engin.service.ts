import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Engin } from '../interfaces/engin';

@Injectable({
  providedIn: 'root'
})
export class EnginService {

  constructor(private http: HttpClient) { }

  getEngin(): Observable<Engin[]>{
    return this.http.get<Engin[]>('http://localhost:8083/lrcServer/engins/All');
  }
  getEnginById(id: number): Observable<Engin>{
    return this.http.get<Engin>(`http://localhost:8083/lrcServer/engins/${id}`);
  }
  getEnginExterne(): Observable<Engin[]>{
    return this.http.get<Engin[]>('http://localhost:8083/lrcServer/engins/externe');
  }
  getEnginInterne(): Observable<Engin[]>{
    return this.http.get<Engin[]>('http://localhost:8083/lrcServer/engins/interne');
  }
  getEnginCamion(): Observable<Engin[]>{
    return this.http.get<Engin[]>('http://localhost:8083/lrcServer/engins/camion');
  }
  getEnginVehicule(): Observable<Engin[]>{
    return this.http.get<Engin[]>('http://localhost:8083/lrcServer/engins/vehicule');
  }
  editEngin(engin:Engin): Observable<Engin>{
    return this.http.put<Engin>("http://localhost:8083/lrcServer/engins/edit/"+engin.type,engin);
  }

  addEnginExterne(engin: Engin): Observable<Engin>{
    return this.http.post<Engin>('http://localhost:8083/lrcServer/engins/Add/externe',engin);
  }
  addEnginInterne(engin: Engin): Observable<Engin>{
    return this.http.post<Engin>('http://localhost:8083/lrcServer/engins/Add/interne',engin);
  }
  addEnginCamion(engin: Engin): Observable<Engin>{
    return this.http.post<Engin>('http://localhost:8083/lrcServer/engins/Add/camion',engin);
  }
  addEnginVehicule(engin: Engin): Observable<Engin>{
    return this.http.post<Engin>('http://localhost:8083/lrcServer/engins/Add/vehicule',engin);
  }
}
