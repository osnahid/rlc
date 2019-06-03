import { Component, OnInit, Input, } from '@angular/core';
import { EtudePrixModule } from './etude-prix.module';
import { AppelOffre } from '../interfaces/appel-offre';
import { EtudePrix } from '../interfaces/etude-prix';
import { AppelOffreService } from '../services/appel-offre.service';
import { EtudePrixService } from '../services/etude-prix.service';

@Component({
  selector: 'app-etude-prix',
  templateUrl: './etude-prix.component.html',
  styleUrls: ['./etude-prix.component.css']
})
export class EtudePrixComponent implements OnInit {
  eps: EtudePrixModule[];
  _ao: AppelOffre;
  @Input() 
  set ao(ao: AppelOffre){
    this.eps = [];
    ao.etudePrix.forEach(
      (value: EtudePrix) => {
        this.eps.push(
          new EtudePrixModule(value)
        );
      });
    this._ao = ao;
  }
  get ao(): AppelOffre{
    return this._ao;
  }
  add: boolean= false;
  
  constructor(private aos: AppelOffreService,private ets: EtudePrixService) { 
    
  }
  ngOnInit() {
    
  }
  
  eta(added: boolean){
    if(added){
    this.eps = [];
    this.aos.getAO(this._ao.numAO).subscribe(data => data.etudePrix.forEach((value: EtudePrix) => {this.eps.push(new EtudePrixModule(value));}));
    this.add = false;
    }
  }
  delete(id :EtudePrix,position: number){
    this.ets.deleteEt(id.idET).subscribe(data => 
      this.eps.splice(position)
      );
  }

}
