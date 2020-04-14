import { Component, OnInit, Input, } from '@angular/core';
import { EtudePrixModule } from './etude-prix.module';
import { AppelOffre } from '../interfaces/appel-offre';
import { EtudePrix } from '../interfaces/etude-prix';
import { AppelOffreService } from '../services/appel-offre.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-etude-prix',
  templateUrl: './etude-prix.component.html',
  styleUrls: ['./etude-prix.component.css']
})
export class EtudePrixComponent implements OnInit {
  eps: EtudePrixModule[]=[];
  ao: AppelOffre;
  constructor(private aos: AppelOffreService,private message: MessageService) { 
    
  }
  ngOnInit() {
    this.aos.currentAO.subscribe(data => {
      if(data.etudePrix) {
      this.eps = [];
      data.etudePrix.forEach(
      (value: EtudePrix) => 
        {this.eps.push(new EtudePrixModule(value));}
      );
        
    }
      if(data) this.ao = data;
    }
    );
  }
  
  delete(id :EtudePrix,position: number){
    this.aos.deleteEt(id.idET).subscribe(data => {
      this.aos.getAO(this.ao.numAO);
      this.message.add({
        severity:"info",
        summary:"etude du prix a été supprimé"
      });
    }
  );
  }

}
