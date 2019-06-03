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
    return this.http.get<Engin[]>('http://localhost:8080/engins/All');
  }
  getEnginExterne(): Observable<Engin[]>{
    return this.http.get<Engin[]>('http://localhost:8080/engins/externe');
  }
  getEnginInterne(): Observable<Engin[]>{
    return this.http.get<Engin[]>('http://localhost:8080/engins/interne');
  }
  getEnginCamion(): Observable<Engin[]>{
    return this.http.get<Engin[]>('http://localhost:8080/engins/camion');
  }
  getEnginVehicule(): Observable<Engin[]>{
    return this.http.get<Engin[]>('http://localhost:8080/engins/vehicule');
  }
  editEngin(engin:Engin): Observable<Engin>{
    return this.http.put<Engin>("http://localhost:8080/engins/edit",engin);
  }

  addEnginExterne(engin: Engin): Observable<Engin>{
    return this.http.post<Engin>('http://localhost:8080/engins/Add/externe',engin);
  }
  addEnginInterne(engin: Engin): Observable<Engin>{
    return this.http.post<Engin>('http://localhost:8080/engins/Add/interne',engin);
  }
  addEnginCamion(engin: Engin): Observable<Engin>{
    return this.http.post<Engin>('http://localhost:8080/engins/Add/camion',engin);
  }
  addEnginVehicule(engin: Engin): Observable<Engin>{
    return this.http.post<Engin>('http://localhost:8080/engins/Add/vehicule',engin);
  }
}
