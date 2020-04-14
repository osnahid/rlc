import { DO } from './do';
import { Chantier } from './chantier';

export class Decomptes {
    idD:number;
	date:Date;
	chd: Chantier;
	dos:DO[]=[];
}
