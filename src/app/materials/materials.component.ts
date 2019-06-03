import { Component, OnInit } from '@angular/core';
import { Materiel } from '../interfaces/materiel';
import { MaterielService } from '../services/materiel.service';
import { CategorieMateriel } from '../interfaces/categorie-materiel';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit {
  materials: Materiel[];
  categories: CategorieMateriel[];
  mat: Materiel= new Materiel();
  addm: boolean= false;
  constructor(private ms: MaterielService) {

   }

  ngOnInit() {
    this.ms.getMateriel().subscribe(data => this.materials = data);
    this.ms.getCatMat().subscribe(data => this.categories = data);
  }
  addMat(){
    if(this.mat){
      this.ms.addMateriel(this.mat).subscribe(data => this.materials.push(data));
    }
    this.addm = !this.addm;
    this.mat = new Materiel();
  }

}
