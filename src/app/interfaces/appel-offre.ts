import { Soumission } from './soumission';
import { EtudePrix } from './etude-prix';
import { InstallationChantier } from './installation-chantier';

export class AppelOffre {
    numAO: string;
	dateAO: Date;
	objet: string;
	localisation: string;
	soumission: Soumission;
	etudePrix: EtudePrix[] = [];
	estimation: number;
	ic: InstallationChantier[] = [];
}
