import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Engin } from 'src/app/interfaces/engin';
import { Personnel } from 'src/app/interfaces/personnel';
import { Chantier } from 'src/app/interfaces/chantier';
import { LocationCh } from 'src/app/interfaces/location-ch';
import { MessageService, SelectItem } from 'primeng/api';
import { ChantierService } from 'src/app/services/chantier.service';
import { Dropdown } from 'primeng/primeng';
import { EnginService } from 'src/app/services/engin.service';
import { PersonnelService } from 'src/app/services/personnel.service';



@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.css']
})
export class AjouterComponent implements OnInit {
  ch :Chantier = new Chantier();
  engins: SelectItem[]=[];
  personnels: SelectItem[]=[];
  location: LocationCh= new LocationCh();
  locations: LocationCh[]=[];

  @Output() added = new EventEmitter<boolean>();
  

  constructor(private message: MessageService,private chs : ChantierService,private enginApi:EnginService,private persoApi: PersonnelService) {
   }

  ngOnInit() {
    this.chs.currentChantier.subscribe(data => {
      this.ch = data;
      data.personnels.forEach(
        personne=>{
          this.personnels.push({label:personne.nom+" "+personne.prenom+" "+personne.fonction,value:personne});
        }
      );
    });
    this.enginApi.getEngin().subscribe(dataE => {
      dataE.forEach(
        val =>{
          let f = true;
          this.ch.locations.forEach(
            valL=>{
              if(valL.engin.idEngin === val.idEngin)f=false;
            }
          );
          if(f) this.engins.push({label:val.designation+" "+val.caracteristiques,value:val});
        }
      );
    });
  }

  onDelete(i: number){
    this.locations.splice(i,1);
  }

  onAdd(en: Dropdown,per: Dropdown){
    console.log(en.findOptionIndex(this.location.engin,this.personnels));
    
    if(this.location.chauffeur && this.location.engin && this.location.nbrHeure && this.location.prixGaz){
      this.locations.push(this.location);
      this.location = new LocationCh();
      en.clear(null);
      per.clear(null);
    }else{
        this.message.add({severity:"warn",detail:"vous devez remplir tous les details"});
    }
  }

  add(){
    if(this.locations.length === 0) this.message.add({severity:"error",detail:"vous n'avez ajouté aucune locations!!!"});
    else {
      this.chs.addLoc(this.ch.numCh,this.locations);
      this.locations = [];
      this.message.add({severity:"success",detail:"les locations ont été ajoutées"});
      this.added.emit(true);
    }
  }
  cancel(){
    this.added.emit(false);
    this.locations = [];
    this.location = new LocationCh();
  }

}
