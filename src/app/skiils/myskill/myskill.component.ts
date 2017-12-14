import { Component, OnInit,ViewEncapsulation} from '@angular/core';
import {SelectModule} from 'ng2-select';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Skill {
  id: string; 
  title: string;
  fest: string;
  date: string;
  venue: string;
  time: string;
  pubtime: string;
}

@Component({
  selector: 'app-myskill',
  templateUrl: './myskill.component.html',
  styleUrls: ['./myskill.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MyskillComponent implements OnInit {
  skillsCol: AngularFirestoreCollection<Skill>;
  // notices: Observable<notice[]>;
  skills: any

  isFetching = true;
  isEmpty = false;
  editSkill = false;
  UID = localStorage.getItem('UID');
  skillsRef = "users/"+this.UID+"/Skills/";
  public items:Array<string> = ['C','C++','Java','Designing','Data Analysis','Public Speaking','Photoshop','Git'];
  
  private mySkills:any = [];
  private removedList:Array<string> = [];
  private addedList:Array<string> = [];
  constructor(private afs: AngularFirestore) {}
  ngOnInit() {
    this.skillsCol = this.afs.collection(this.skillsRef, 
      ref => ref.orderBy('endorsements', 'desc')
        // .where('orgID', '==', localStorage.getItem('orgID'))
      )
    this.skills = this.skillsCol.snapshotChanges()
    .map(actions => {
      this.isFetching=false;
      if(actions.length == 0){
        this.isEmpty = true;
      }
      // console.log(actions);
      this.mySkills = actions.map(a =>{
        return a.payload.doc.id;
      })
      return actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id;        
        return { id, data };
      });
    });  
  }

  public selected(value:any):void {
    var index = this.removedList.indexOf(value.id);
    if(index == -1){
      this.addedList.push(value.id);
    }else{
      this.removedList.splice(index,1);
    }
    // console.log('Added value is: ', this.addedList);
    // console.log('Removed List is: ', this.removedList);
  }

  public removed(value:any):void {
    var index = this.addedList.indexOf(value.id);
    if(index == -1){
      this.removedList.push(value.id);
    }else{
      this.addedList.splice(index,1);
    }
  }

  public refreshValue(value:any):void {
    this.mySkills = value;
  }

  // public itemsToString(value:Array<any> = []):string {
  //   return value
  //     .map((item:any) => {
  //       return item.text;
  //     }).join(',');
  // }
  private newSkill(ID){
    this.afs.collection(this.skillsRef).doc(ID).set({
      endorsements:0
    });    
  }
  private delItem(ID){
    this.afs.doc(this.skillsRef+ID).delete();
  }
  public updateSkills(){
    console.log("Updating Skills...");
    // var UID = localStorage.getItem('UID');
    this.removedList.map(id => this.delItem(id));
    this.addedList.map(id => this.newSkill(id));
    console.log('Added skills are: ', this.addedList);
    console.log('Removed skills are: ', this.removedList);
    this.editSkill = false;
    this.removedList = [];
    this.addedList = [];
  }
  public switchEditMode(mode){
    // console.log(this.skills);
    this.editSkill = mode;
  }
}
