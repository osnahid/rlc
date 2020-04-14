import { Component, OnInit, Input } from '@angular/core';
import { Chantier } from 'src/app/interfaces/chantier';
import { ChantierService } from 'src/app/services/chantier.service';
import { Personnel } from 'src/app/interfaces/personnel';
import { MessageService } from 'primeng/api';
import { Reparation } from 'src/app/interfaces/reparation';
import { Entretien } from 'src/app/interfaces/entretien';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  chantier: Chantier= new Chantier();
  personnels: Personnel[]=[];
  cols:any[] = [
    { field: 'nom', header: 'Nom' },
    { field: 'prenom', header: 'Prenom' },
    { field: 'qualification', header: 'Qualification' },
    { field: 'fonction', header: 'Fonction' },
    { field: 'cnss', header: 'CNSS' },
    { field: 'tele', header: 'Telephone' },
    { field: 'salaire', header: 'Salaire' },
    { field: 'dateEm', header: 'Date d\'Embauche' }
  ];
  constructor(private chApi: ChantierService,private message: MessageService) { }

  ngOnInit() {
    this.chApi.currentChantier.subscribe(data => {
      this.chantier = data;
      this.personnels = data.personnels;
    });
  }
  
  onRowDelete(i: number){
    this.personnels.splice(i,1);
    this.chantier.personnels = this.personnels;
    this.chApi.editChantier(this.chantier).subscribe(
      data => {
        this.message.add({severity:"success",summary:"le personnel a été supprimé de ce chantier"});
        this.chApi.getChantier(this.chantier.numCh);
      }
    );
  }
}
