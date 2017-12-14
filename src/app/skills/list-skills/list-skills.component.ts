import { Component, OnInit } from '@angular/core';
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
  selector: 'app-list-skills',
  templateUrl: './list-skills.component.html',
  styleUrls: ['./list-skills.component.css']
})
export class ListSkillsComponent implements OnInit {

  skillsCol: AngularFirestoreCollection<Skill>;
  // notices: Observable<notice[]>;
  skills: any

  isFetching = true;
  isEmpty = false;
  UID = localStorage.getItem('UID');
  skillsRef = "users/"+this.UID+"/Skills/";
  constructor(private afs: AngularFirestore) {}
  ngOnInit() {
    this.skillsCol = this.afs.collection(this.skillsRef, 
      ref => ref.orderBy('endrosments', 'desc')
        // .where('orgID', '==', localStorage.getItem('orgID'))
      )
    this.skills = this.skillsCol.snapshotChanges()
    .map(actions => {
      this.isFetching=false;
      if(actions.length == 0){
        this.isEmpty = true;
      }
      console.log(actions);
      return actions.map(a => {
        // console.log(a);
        const data = a.payload.doc.data()
        const id = a.payload.doc.id;        
        return { id, data };
      });
    });  
  }
  // updateNoticeOld(ID){
  //   console.log("..")
  //   var notice_data = this.firstFormGroup.value
  //   // var event_data = this.secondFormGroup.value
  //   // var pub_time = new Date();
  //   var pub_time  =Date.now();
  //   console.log(notice_data);
  //   console.log(ID);
  //   // console.log(event_data);
  //   this.afs.collection(this.noticeRef).doc(ID).update({
  //     'title': notice_data.notice_title,
  //     'fest': notice_data.notice_occasion,
  //     'about': notice_data.notice_about,
  //     'date':notice_data.event_date,
  //     'venue':notice_data.event_venue,
  //     'time':notice_data.event_time,
  //     'pubtime':pub_time
  //     });
  // }
  updateNotice(ID,field,newValue) {
    console.log(ID,field, newValue);
    var temp = {}
    temp[field]=newValue;
    console.log(temp);
    this.afs.collection(this.skillsRef).doc(ID).update(temp);
  }
  delItem(ID): void{
    console.log(ID);
    this.afs.doc(this.skillsRef+ID).delete();
  }
  getSkills(){
    return this.skills;
  }
}

