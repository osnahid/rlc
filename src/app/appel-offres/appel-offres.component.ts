import { Component, OnInit } from '@angular/core';
import { AppelOffreService } from '../services/appel-offre.service';
import { AppelOffre } from '../interfaces/appel-offre';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appel-offres',
  templateUrl: './appel-offres.component.html',
  styleUrls: ['./appel-offres.component.css']
})
export class AppelOffresComponent implements OnInit {
  appelOffre: AppelOffre=new AppelOffre();
  appelOffres: AppelOffre[];
  cols: any[];
  display=false;

  constructor(private aos: AppelOffreService, private router: Router) { }
  
  ngOnInit() {
    this.getAO();
    this.cols = [
      { field: 'numAO', header: 'numero' },
      { field: 'objet', header: 'objet' },
      { field: 'dateAO', header: 'date' },
      { field: 'localisation', header: 'localisation' }
    ];
  }
  getAO(){
    this.aos.getAllAO().subscribe(data => this.appelOffres = data);
  }
  onRowSelect(event){
    console.log(event.data);
    this.router.navigate(['AppelOffres/'+event.data.numAO]);
  }
  deleteAO(id:string){
    console.log(id);
    this.aos.deleteAo(id);
    this.getAO();
  }
  addAo(){
    this.aos.addAo(this.appelOffre).subscribe(data => this.getAO());
    this.appelOffre = new AppelOffre();
    this.display = false;
  }
}
