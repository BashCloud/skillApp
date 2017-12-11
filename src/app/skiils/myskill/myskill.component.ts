import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {SelectModule} from 'ng2-select';


@Component({
  selector: 'app-myskill',
  templateUrl: './myskill.component.html',
  styleUrls: ['./myskill.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MyskillComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  public items:Array<string> = ['C','C++','Java','Designing','Data Analysis','Public Speaking','Photoshop','Git'];

private value:any = ['C'];
private _disabledV:string = '0';
private disabled:boolean = false;

private get disabledV():string {
  return this._disabledV;
}

private set disabledV(value:string) {
  this._disabledV = value;
  this.disabled = this._disabledV === '1';
}

public selected(value:any):void {
  console.log('Selected value is: ', value);
}

public removed(value:any):void {
  console.log('Removed value is: ', value);
}

public refreshValue(value:any):void {
  this.value = value;
}

public itemsToString(value:Array<any> = []):string {
  return value
    .map((item:any) => {
      return item.text;
    }).join(',');
}

}
