import { Engin } from './engin';
import { Chantier } from './chantier';

export class Entretien {
    idE:number;
	designation:string;
	date:Date;
	pu:number;
	enginE:Engin;
	CHE:Chantier;
}
