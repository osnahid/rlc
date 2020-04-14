import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChantierService } from 'src/app/services/chantier.service';
import { Chantier } from 'src/app/interfaces/chantier';
import { PersonnelService } from 'src/app/services/personnel.service';
import { Personnel } from 'src/app/interfaces/personnel';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-affectation',
  templateUrl: './affectation.component.html',
  styleUrls: ['./affectation.component.css']
})
export class AffectationComponent implements OnInit {
  chantier: Chantier= new Chantier();
  personnels: Personnel[] = [];
  selectedPerso : Personnel[]=[];
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
  @Output() added = new EventEmitter<boolean>();
  constructor(private route: ActivatedRoute,private chApi:ChantierService,private persoApi: PersonnelService,private message: MessageService) { }

  ngOnInit() {
    this.chApi.currentChantier.subscribe(data => {
      this.chantier = data;
      this.selectedPerso = data.personnels;
    } );
    this.persoApi.getPersonnels().subscribe(data => this.personnels = data);
  }

  add(){
    if(this.selectedPerso.length === 0){
      this.message.add({severity:"error",detail:"vous devez selectionner des personnels"});
    }else{
      this.chantier.personnels = this.selectedPerso;
      this.chApi.editChantier(this.chantier).subscribe(data => this.added.emit(true));
      this.message.add({severity:"success",detail:"les personnels sont enregistrés"});
      this.added.emit(true);
    }
  }

  cancel(){
    this.added.emit(false);
  }
}
