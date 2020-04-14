import { Component, OnInit } from '@angular/core';
import { ChantierService } from 'src/app/services/chantier.service';

@Component({
  selector: 'app-se',
  templateUrl: './se.component.html',
  styleUrls: ['./se.component.css']
})
export class SeComponent implements OnInit {
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
        data.bt.forEach(element => {
          this.depences.push({
            nature : element.type+" "+ element.designation,
            date : element.date,
            montant : element.montant
          });
        });
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
