import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppelOffre } from 'src/app/interfaces/appel-offre';
import { So } from 'src/app/interfaces/so';
import { OuvrageService } from 'src/app/services/ouvrage.service';
import { SoService } from 'src/app/services/so.service';
import { MessageService } from 'primeng/api';
import { AppelOffreService } from 'src/app/services/appel-offre.service';

@Component({
  selector: 'app-add-soumissions',
  templateUrl: './add-soumissions.component.html',
  styleUrls: ['./add-soumissions.component.css']
})
export class AddSoumissionsComponent implements OnInit {
  ao: AppelOffre;
  @Output() added= new EventEmitter();
  pickFrom: So[] = [];
  picks:So[] = [];
  constructor(private os: OuvrageService,private sos: SoService,private aoApi: AppelOffreService,private message: MessageService) {
   }
   ngOnInit() {
     this.aoApi.currentAO.subscribe(data => 
      {
        this.ao = data;
        data.soumission.so.forEach(
          ouv =>{
            this.picks.push(ouv);
          }
        );
        this.os.getOuvrage().subscribe(data => data.forEach(
          value =>{
            let ok:boolean = true;
            this.picks.forEach(val => {
             if(val.ouv.idOuvrage === value.idOuvrage){
               ok = false;
              }
            });
            if(ok){
               let so: So = new So();
               so.prix = value.prixV;
               so.ouv = value;
               so.qte = 0;
               this.pickFrom.push(so);
            }
          }
        ));
      }
      );
     
     
  }

   save(){
     if(this.picks.length > 0){
      this.sos.addListSo(this.ao.numAO,this.picks).subscribe(data => {
        this.added.emit(true);
        this.message.add({severity:'success', summary: 'L\'insertion a été enregistré', detail:''});
      });
     }else{
      this.message.add({severity:'error', summary: 'vous devez choisir des ouvrages pour enregistrer', detail:''});
     }
   }

  

}
