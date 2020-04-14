import { Component, OnInit, Input } from '@angular/core';
import { Chantier } from 'src/app/interfaces/chantier';
import { ChantierService } from 'src/app/services/chantier.service';
import { AchatMaterielCh } from 'src/app/interfaces/achat-materiel-ch';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-achat',
  templateUrl: './list-achat.component.html',
  styleUrls: ['./list-achat.component.css']
})
export class ListAchatComponent implements OnInit {
  chantier: Chantier = new Chantier();
  constructor(private chApi : ChantierService,private message: MessageService) { }

  ngOnInit() {
    this.chApi.currentChantier.subscribe(data => this.chantier=data);
  }
  getTotal(): number{
    let t = 0;
    if(this.chantier.achats)
    this.chantier.achats.forEach(
      (value) => {
        t += value.prix * value.qte;
      }
    );
    return t;
  }
  onDelete(achat: AchatMaterielCh){
    this.chApi.deleteAchat(achat.idAM).subscribe(data => {
      this.chApi.getChantier(this.chantier.numCh);
      this.message.add({severity:"success",summary:"Achat de material a été supprimée"});
    },error => {
      this.message.add({severity:"success",summary:"Achat de material n'a pas été supprimée"});
    })
  }
  update(achat: AchatMaterielCh){
    this.chApi.editAchat(this.chantier.numCh,achat).subscribe();
  }
}
