import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
interface User {
  displayName:string
}
@Component({
  selector: 'app-hover-card',
  templateUrl: './hover-card.component.html',
  styleUrls: ['./hover-card.component.css']
})
export class HoverCardComponent implements OnInit {
  @Input() UID:string;
  userRef:string;
  userDoc: AngularFirestoreDocument<User>;
  userDetails: Observable<User>;
  isSelf = false;
  constructor(private afs: AngularFirestore){ 
  }

  ngOnInit() {
    this.userRef = "users/"+this.UID;
    this.userDoc = this.afs.doc(this.userRef)
    this.userDetails  = this.userDoc.valueChanges()
    if(this.UID == localStorage.getItem('UID')){
      this.isSelf = true;
    }
  }
}
