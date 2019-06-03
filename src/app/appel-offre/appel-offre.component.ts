import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppelOffre } from '../interfaces/appel-offre';
import { AppelOffreService } from '../services/appel-offre.service';
import { EtudePrix } from '../interfaces/etude-prix';
import { EtudePrixModule } from '../etude-prix/etude-prix.module';
import { InstallationChantier } from '../interfaces/installation-chantier';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

@Component({
  selector: 'app-appel-offre',
  templateUrl: './appel-offre.component.html',
  styleUrls: ['./appel-offre.component.css']
})
export class AppelOffreComponent implements OnInit {

  constructor(private route: ActivatedRoute, private aos: AppelOffreService) { }
  id: string;
  ao: AppelOffre = new AppelOffre();
  modIc:boolean= false;
  addIc:boolean= false;
  ic: InstallationChantier = new InstallationChantier();
  
  addIC(){
    if(this.ic) this.aos.addIc(this.ic,this.ao.numAO,).subscribe(data => this.getAO(this.ao.numAO));
    this.ic = new InstallationChantier(); 
  }
  modIC(i: InstallationChantier){
    this.modIc=!this.modIc;
    this.ic = i;
  }
  addClick(){
    this.addIc=!this.addIc;
    this.ic = new InstallationChantier();
  }
  deleteIc(i: InstallationChantier){
    this.aos.deleteIc(i).subscribe(data => this.getAO(this.ao.numAO));
  }
  cancelModIc(){
    this.modIc = !this.modIc;
    this.ic = new InstallationChantier();
  }
  saveModIc(){
    this.aos.editIc(this.ic,this.ao.numAO).subscribe(data => this.getAO(this.ao.numAO));
    this.modIc = !this.modIc;
  }
  ngOnInit() {
    this.id= this.route.snapshot.params['id'];
    this.getAO(this.id);
  }
  getAO(id: string){
    this.aos.getAO(id).subscribe(data => this.ao = data);
  }
  getTotalInsC(): number{
    let t:number=0;
    this.ao.ic.forEach(
      (value)=>{
        t += value.montant;
      }
    );
    return t;
  }
}
