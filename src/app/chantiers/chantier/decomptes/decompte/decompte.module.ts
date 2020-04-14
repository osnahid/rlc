import { DO } from 'src/app/interfaces/do';
import { So } from 'src/app/interfaces/so';

export class DecompteModule {
  do: DO;
  so: So;
  constructor(d:DO, s:So){
    this.do =d;
    this.so =s;
  }
 }
