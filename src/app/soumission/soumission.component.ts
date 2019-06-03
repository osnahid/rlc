import { Component, OnInit, Input } from '@angular/core';
import { AppelOffre } from '../interfaces/appel-offre';
import { So } from '../interfaces/so';
import { SoService } from '../services/so.service';
import { Column } from 'primeng/primeng';
import { AppelOffreService } from '../services/appel-offre.service';

@Component({
  selector: 'app-soumission',
  templateUrl: './soumission.component.html',
  styleUrls: ['./soumission.component.css']
})
export class SoumissionComponent implements OnInit {
  @Input() ao: AppelOffre;
  sos: So[];
  
  cols: any[] = [
    {field: 'ouv.designation', header: 'Désignation des Ouvrages'},
    {field:'ouv.unite', header: 'Unite'},
    {field:'qte', header: 'Qte'},
    {field:'ouv.prixV', header:'prix unitaire'},
    {field:'total', header:'Totale'}
  ];
  totales: number=0;
  displayAL: boolean=false;
  displayA: boolean=false;
  constructor(private soService: SoService,private aoService: AppelOffreService) { }

  ngOnInit() {
    
  }
  getTotal(): number{
    let totale: number = 0;
    this.ao.soumission.so.forEach(
      (value)=>{
        totale += (value.qte*value.ouv.prixV); 
      }
    );
    return totale;
  }
  onAdded(added: boolean){
    if(added) this.aoService.getAO(this.ao.numAO).subscribe(data => this.ao = data);
  }
  

}
