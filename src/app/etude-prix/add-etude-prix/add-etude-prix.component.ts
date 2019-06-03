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
import { EtudePrixService } from 'src/app/services/etude-prix.service';

@Component({
  selector: 'app-add-etude-prix',
  templateUrl: './add-etude-prix.component.html',
  styleUrls: ['./add-etude-prix.component.css']
})
export class AddEtudePrixComponent implements OnInit {
  @Input() ao: AppelOffre;
  @Output() added = new EventEmitter<boolean>();
  fois: boolean= true;
  ouv: boolean= true;
  loc: boolean = false;
  acm: boolean= true;
  acad: boolean = false;
  et : EtudePrix = new EtudePrix();
  prixGaz: number;
  ouvrages: Ouvrage[] = [];
  engins: Engin[] = [];
  locations: LocationEp[] = [];
  location: LocationEp = new LocationEp();
  acmateriels: AchatMateriel[] = [];
  ac: AchatMateriel = new AchatMateriel();
  materiels: Materiel[] = [];
  camions: Engin[] = [];
  constructor(private apiOuvrage: OuvrageService,private apiEngin: EnginService, private apiMateriel: MaterielService, private ets: EtudePrixService) {
    this.apiOuvrage.getOuvrage().subscribe(
      data => this.ouvrages = data
    );
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
      data => this.materiels = data
    );
  }

  ngOnInit() {
    
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
    this.et.locations = this.locations;
    this.et.materiels = this.acmateriels;
    this.ets.addEtudePrix(this.ao.numAO,this.et).subscribe(dataEt => 
      {
        // if(this.acmateriels.length > 0) this.acmateriels.forEach(
        //   (value)=>{
        //     this.ets.addAchatMateriel(dataEt.idET,value).subscribe(data => console.log(true));
        //   }
        // );
        // if(this.locations.length > 0) this.locations.forEach(
        //   (value)=>{
        //     value.prixGaz = this.prixGaz;
        //     this.ets.addLocation(dataEt.idET,value).subscribe(data => console.log(true));
        //   });
        this.added.emit(true);
      }
      );
      
  }
  reset(){
    this.acmateriels = [];
    this.locations = [];
  }

}
