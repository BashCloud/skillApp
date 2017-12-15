import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface User {
  displayName:string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userssCol: AngularFirestoreCollection<User>;
  users: any;
  usersRef = "users/";
  constructor(public auth: AuthService,private afs: AngularFirestore) { }

  ngOnInit() {
    this.userssCol = this.afs.collection(this.usersRef, 
      ref => ref.orderBy('displayName')
      )
    this.users = this.userssCol.snapshotChanges()
    .map(actions => {
      // this.isFetching=false;
      if(actions.length == 0){
        // this.isEmpty = true;
      }
      var temp = actions.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id;
        if(id != localStorage.getItem('UID'))        
          return { id, data };
      });
      return temp.filter(function( element ) {
        return element !== undefined;
     });
    });  
  }
}
