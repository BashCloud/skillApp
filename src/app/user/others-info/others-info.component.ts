import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

interface User {
  displayName:string
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
   });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
