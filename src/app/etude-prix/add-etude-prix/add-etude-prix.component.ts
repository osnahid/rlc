import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppelOffre } from 'src/app/interfaces/appel-offre';
import { EtudePrix } from 'src/app/interfaces/etude-prix';
import { Ouvrage } from 'src/app/interfaces/ouvrage';
import { OuvrageService } from 'src/app/services/ouvrage.service';
import { Engin } from 'src/app/interfaces/engin';
import { EnginService } from 'src/app/services/engin.service';
import { LocationEp } from 'src/app/interfaces/locationEp';
import { Materiel } from 'src/app/interfaces/materiel';
import { MaterielService } from 'src/app/services/materiel.service';
import { AchatMateriel } from 'src/app/interfaces/achat-materiel';
import { AppelOffreService } from 'src/app/services/appel-offre.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-add-etude-prix',
  templateUrl: './add-etude-prix.component.html',
  styleUrls: ['./add-etude-prix.component.css']
})
export class AddEtudePrixComponent implements OnInit {
  ao: AppelOffre;
  @Output() added = new EventEmitter<boolean>();
  fois: boolean= true;
  ouv: boolean= true;
  loc: boolean = false;
  acm: boolean= true;
  acad: boolean = false;
  et : EtudePrix = new EtudePrix();
  prixGaz: number = 10;
  ouvrages: Ouvrage[] = [];
  engins: Engin[] = [];
  locations: LocationEp[] = [];
  location: LocationEp = new LocationEp();
  acmateriels: AchatMateriel[] = [];
  ac: AchatMateriel = new AchatMateriel();
  materiels: SelectItem[] = [];
  camions: Engin[] = [];
  constructor(private apiAO: AppelOffreService,private apiOuvrage: OuvrageService,private apiEngin: EnginService, private apiMateriel: MaterielService) {
    
  }

  ngOnInit() {
    this.apiAO.currentAO.subscribe(data => {
      this.ao = data;
      data.soumission.so.forEach(
        value =>{
          let c : boolean = true;
            data.etudePrix.forEach(
              val=>{
                if(val.ouvrageE.designation === value.ouv.designation) c=false;
              }
            );
          console.log(c);
          if(c)
          this.ouvrages.push(value.ouv);
        }
      );
    });
    this.apiEngin.getEnginExterne().subscribe(
      data => this.engins = data
    );
    this.apiEngin.getEnginInterne().subscribe(
      data => this.engins = this.engins.concat(data)
    );
    this.apiEngin.getEnginCamion().subscribe(
      data => this.camions = data
    );
    this.apiMateriel.getMateriel().subscribe(
      data => { data.forEach(val =>{
        this.materiels.push({label:val.cm.designation+" "+val.designation,value: val});
      });}
    );
  }
  deleteLoc(index: number){
    this.locations.splice(index);
  }
  deleteAc(index: number){
    this.acmateriels.splice(index);
  }
  addAC(){
    this.acmateriels.push(this.ac);
    this.ac = new AchatMateriel();
    this.acad = false;
  }
  addL(){
    this.locations.push(this.location);
    this.location = new LocationEp();
    this.loc = false;
  }

  addET(){
    if(this.locations.length > 0) this.locations.forEach(
      (value)=>{
        value.prixGaz = this.prixGaz;
      });
    this.apiAO.addEtudePrix(this.ao.numAO,this.et).subscribe(
      data=>{
        this.apiAO.addLocation(this.ao.numAO,data.idET,this.locations).subscribe(datas => {
          console.log(datas);
          this.apiAO.addAchatMateriel(this.ao.numAO,data.idET,this.acmateriels).subscribe(datae => {
            console.log(datae);
            this.added.emit(true);
            this.acmateriels = [];
            this.locations = [];
            this.et = new EtudePrix();
          });
        });  
      }
    );
  }
  reset(){
    this.et = new EtudePrix();
    this.acmateriels = [];
    this.locations = [];
    this.added.emit(false);
  }
}
