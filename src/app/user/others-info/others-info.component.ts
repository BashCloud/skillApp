import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, Validators } from '@angular/forms';

interface User {
  displayName:string
}
interface Skill {
  title: string;
}

@Component({
  selector: 'app-others-info',
  templateUrl: './others-info.component.html',
  styleUrls: ['./others-info.component.css']
})
export class OthersInfoComponent implements OnInit {
  id: string;
  private sub: any;
  isRecomending = false;
  userRef:string;
  userDoc: AngularFirestoreDocument<User>;
  userDetails: Observable<User>;
  skillsCol: AngularFirestoreCollection<Skill>;
  skills: any;
  skillsRef: string;
  public newSkillForm = this.fb.group({
    newSkill: ["", Validators.required]
  });
  constructor(private route: ActivatedRoute,private afs: AngularFirestore,public fb: FormBuilder) { 
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.userRef = "users/"+this.id;
      // console.log(this.userRef);
      // In a real app: dispatch action to load the details here.
      this.userDoc = this.afs.doc(this.userRef)
      this.userDetails  = this.userDoc.valueChanges()
      this.skillsRef = "users/"+this.id+"/Skills/";
      this.skillsCol = this.afs.collection(this.skillsRef, 
        ref => ref.orderBy('endorsements', 'desc')
          // .where('orgID', '==', localStorage.getItem('orgID'))
        )
      this.skills = this.skillsCol.snapshotChanges()
      .map(actions => {
        // this.isFetching=false;
        if(actions.length == 0){
          // this.isEmpty = true;
        }
        return actions.map(a => {
          const data = a.payload.doc.data()
          const id = a.payload.doc.id; 
          var isEndrosed = -1;  
          if(data.endroseBy){ 
            isEndrosed = data.endroseBy.indexOf(localStorage.getItem('UID'));  
          }
          return { id, data, isEndrosed};
        });
      });  
   });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  endrose(skill){
    const skillRef = this.afs.collection(this.skillsRef).doc(skill.id);
    const skillData = { 'endroseBy' : skill.data.endroseBy || []};

    if(skill.isEndrosed == -1){ // not endrosed before...
      skillData['endroseBy'].push(localStorage.getItem('UID'));
      skillData['endorsements'] = skill.data.endorsements +1;
    }
    else{
      skillData['endroseBy'].splice(skill.isEndrosed);
      skillData['endorsements'] = skill.data.endorsements -1;
    }
    // console.log(skill);
    skillRef.update(skillData);
  }

  switchRecomending(state){
    this.isRecomending =state;
  }

  addNew(){
    
    var skill = this.newSkillForm.value.newSkill;
    this.afs.collection(this.skillsRef).doc(skill).set({
      endorsements:1,
      endroseBy:[localStorage.getItem('UID')],
    });
    console.log(skill);
    this.isRecomending = false;
  }
}
