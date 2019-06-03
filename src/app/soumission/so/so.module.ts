import { Ouvrage } from 'src/app/interfaces/ouvrage';
import { So } from 'src/app/interfaces/so';

export class SoModule {
  idSO: number;
  ouv: Ouvrage;
  qte: number;

  constructor(private so: So){
    this.idSO = so.idSO;
    this.ouv = so.ouv;
  }
 }
