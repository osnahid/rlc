import { AppelOffre } from './appel-offre';
import { BesoinT } from './besoin-t';
import { LocationCh } from './location-ch';
import { Personnel } from './personnel';
import { Decomptes } from './decomptes';
import { Reparation } from './reparation';
import { Entretien } from './entretien';
import { AchatMaterielCh } from './achat-materiel-ch';

export class Chantier {
    
	numCh:string;
	date:Date;
    etat:string;
    aoc:AppelOffre;
    bt:BesoinT[]=[];
	locations:LocationCh[]=[];
	personnels:Personnel[]=[];
	decomptes:Decomptes[]=[];
	reparationsC:Reparation[]=[];
	entretiensC:Entretien[]=[];
	achats:AchatMaterielCh[]=[];
}
