import { Engin } from './engin';
import { Chantier } from './chantier';

export class Reparation {
    idR:number;
	designation:string;
	date:Date;
	pu:number;
	enginR:Engin;
	CHR:Chantier;
}
