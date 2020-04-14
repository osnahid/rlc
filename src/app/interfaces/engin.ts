import { Reparation } from './reparation';
import { Entretien } from './entretien';

export class Engin {
    idEngin: number;
    designation: string;
    caracteristiques:string;
    prixLocation: number;
    type: string;
    poids: number;
    consommationH: number;
    prixAchat: number;
    reparations: Reparation[]=[];
    entretiens: Entretien[]=[];
}
