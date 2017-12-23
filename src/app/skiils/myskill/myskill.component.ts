import { Component, OnInit,ViewEncapsulation} from '@angular/core';
import {SelectModule} from 'ng2-select';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Skill {
  title: string;
}

@Component({
  selector: 'app-myskill',
  templateUrl: './myskill.component.html',
  styleUrls: ['./myskill.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MyskillComponent implements OnInit {
  skillsCol: AngularFirestoreCollection<Skill>;
  skills: any

  isFetching = true;
  isEmpty = false;
  editSkill = false;
  UID = localStorage.getItem('UID');
  skillsRef = "users/"+this.UID+"/Skills/";
  public items:Array<string> = ['C','C++','Java','Designing','Data Analysis','Public Speaking','Photoshop','Git','GitHub',
  'Illustrator','Premier Pro','MarkDown','XML','CSS','JavaScript','SQL','HTML','UML','NodeJS','C#','TypeScript','AngularJS','Agular2','ReactJS','Php','ASP.net',
  'Arduino','Python','WordPress','VScode','Bash','Cordova','ElectronJS','PhoneGap','Ionic Framework','Accuracy','Adaptable','Administrative','Advising','Analysis','Analytical','Assembling Apparatus','Being Artistic','Creative','Being Thorough','Business Storytelling','Calculations','Challenging Employees','Classifying Records','Coaching Individuals','Collaboration','Communication','Compiling Statistics','Conducting Meetings','Conflict Resolution','Confronting Others','Construction','Consultation','Counseling','Creating Ideas','Creating Innovation','Creating New Solutions','Creating New Procedures','Creative Thinking','Critical Thinking','Customer Service','Decision Making','Defining Performance Standards','Defining Problems','Demonstrations','Detail Management','Dispensing Information','Editing','Emotional Control','Encouragement','Entertainment','Equipment Operation','Evaluating','Expression of Feelings','Financial Report Auditing','Fundraising','Goal Setting','Handling Complaints','Human Resources','Language Translation','Leadership','Learning','Listening','Maintaining High Levels of Activity','Maintenance','Management','Managing Finances','Measuring Boundaries','Medical Assistance','Meeting Deadlines','Microsoft Office','Monetary Collection','Motivation','Multitasking','Negotiation','Networking','Nonverbal Communication','Numerical Analysis','Oration','Organizational','Organizational Management','Organizational Tasks','Overseeing Meetings','Overseeing Operation','Personal Interaction','Plan Development','Planning','Prediction','Preparing Written Documents','Principal Concept Knowledge','Prioritizing','Problem Solving','Promotions','Proposals','Proposal Writing','Public Relations','Public Speaking','Questioning Others','Reading Volumes','Reasoning','Regulating Rules','Rehabilitating Others','Remembering Facts','Reporting','Report Writing','Responsibility','Service','Scheduling','Screening Calls','Sketching','Supervision','Technical Support','Team Building','Teamwork','Time Management','Toleration','Training',
  'Matlab','Programming ','Application Development','Analytics','Big Data','Business Analytics','Business Intelligence','Business Process Modeling','Cloud Computing','Communication','Content Strategy','Content Management','Configuration','Critical Thinking','Customer Support','Database','Data Analysis','Data Intelligence','Data Mining','Data Science','Data Strategy','Data Storage','Database Administration','Design','Desktop Support','Developer','Development','Documentation','Emerging Technologies','File Systems','Flexibility','Hardware','Help Desk','Implementation','Internet','Information Systems','Installation','Integrated Technologies','IT Manager','IT Optimization','IT Security','IT Soft Skills','IT Solutions','IT Support','Logical Thinking','Leadership','Linux','Management','Messaging','Methodology','Metrics','Microsoft Office','Mobile Applications','Motivation','Networks','Network Operations','Networking','Operating Systems','Operations','Organization','Presentation','Problem Solving','Product Development','Product Support','Product Management','Product Training','Project Management','Repairs','Reporting','Search Engine Optimization (SEO)','Security','Self Motivated','Self Starting','Servers','Software','Software Development','Software Engineering','Software Quality Assurance (QA)','Storage','Support','Systems Software','Team Building','Team Oriented','Teamwork','Tech Skills Listed by Job','Tech Support','Technical','Technology','Technical Services','Technical Support','Technical Writing','Testing','Tools','Time Management','Training','Troubleshooting','UI - UX','User Experience Design','Virtualization','Web','Web Development','Web Design','Work Independently',
  ];
  
  public mySkills:any = [];
  private removedList:Array<string> = [];
  private addedList:Array<string> = [];
  constructor(private afs: AngularFirestore) {}
  ngOnInit() {
    this.skillsCol = this.afs.collection(this.skillsRef, 
      ref => ref.orderBy('endorsements', 'desc')
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
    };
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
    this.removedList.map(id => this.delItem(id));
    this.addedList.map(id => this.newSkill(id));
    // console.log('Added skills are: ', this.addedList);
    // console.log('Removed skills are: ', this.removedList);
    this.editSkill = false;
    this.removedList = [];
    this.addedList = [];
  }
  public switchEditMode(mode){
    this.editSkill = mode;
  }
}
