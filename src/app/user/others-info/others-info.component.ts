import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

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
  userRef:string;
  userDoc: AngularFirestoreDocument<User>;
  userDetails: Observable<User>;
  skillsCol: AngularFirestoreCollection<Skill>;
  skills: any;
  skillsRef: string;
  constructor(private route: ActivatedRoute,private afs: AngularFirestore) { 
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.userRef = "users/"+this.id;
      console.log(this.userRef);
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
        // console.log(actions);
        // this.mySkills = actions.map(a =>{
        //   return a.payload.doc.id;
        // })
        return actions.map(a => {
          const data = a.payload.doc.data()
          const id = a.payload.doc.id;        
          return { id, data };
        });
      });  
   });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
