import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-t',
  templateUrl: './t.component.html',
  styleUrls: ['./t.component.css']
})
export class TComponent implements OnInit {
  o: number;
  @Input()
  set i(i:number){
    this.o = i;
  }
  get i(): number{
    return this.o;
  }
  constructor() { }

  ngOnInit() {
  }

}
