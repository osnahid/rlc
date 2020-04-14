import { Component, OnInit } from '@angular/core';
import { ChantierService } from 'src/app/services/chantier.service';

@Component({
  selector: 'app-depences',
  templateUrl: './depences.component.html',
  styleUrls: ['./depences.component.css']
})
export class DepencesComponent implements OnInit {

  constructor(private apiCh : ChantierService) { }

  depences: {nature:string;date:Date;montant:number}[] = [];
  cols: any[] = [
    {field:"nature", header:"Nature"},
    {field:"date", header:"Date"},
    {field:"montant", header:"Montant"}
  ];

  ngOnInit() {
    this.apiCh.currentChantier.subscribe(
      data => {
        data.achats.forEach(element => {
          this.depences.push({
            nature : "achat "+ element.materiel.designation,
            date : element.date,
            montant : element.prix * element.qte
          });
        });
        data.entretiensC.forEach(
          element => {
            this.depences.push(
              {nature : "entretien "+ element.enginE.designation,
              date : element.date,
              montant : element.pu}
            );
          }
        );
        data.reparationsC.forEach(
          element => {
            this.depences.push(
              {nature : "reparation "+ element.enginR.designation,
              date : element.date,
              montant : element.pu}
            );
          }
        );
        data.decomptes.forEach(
          element => {
            element.dos.forEach(
              value => {
                this.depences.push({
                  nature : "decomptes "+ value.ouv.designation,
                  date : element.date,
                  montant : value.ouv.prixV * value.qte
                });
              }
            );
          }
        );
      }
    );
  }
  getTotal(): number{
    let i = 0;
    this.depences.forEach(element => {
      i+= element.montant;
    });
    return i;
  }

}
