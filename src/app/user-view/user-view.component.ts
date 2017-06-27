import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})

export class UserViewComponent implements OnInit {
  data = [
    {id: 0, day: 'Mon', firstRule: false, secondRule: false, thirdRule: false},
    {id: 1, day: 'Tues', firstRule: false, secondRule: false, thirdRule: false},
    {id: 2, day: 'Wed', firstRule: false, secondRule: false, thirdRule: false},
    {id: 3, day: 'Thur', firstRule: false, secondRule: false, thirdRule: false},
    {id: 4, day: 'Fri', firstRule: false, secondRule: false, thirdRule: false},
    {id: 5, day: 'Sat', firstRule: false, secondRule: false, thirdRule: false},
    {id: 6, day: 'Sun', firstRule: false, secondRule: false, thirdRule: false}
  ];

  userName: string;
  database: AngularFireDatabase;
  observableData: FirebaseObjectObservable<any[]>;

  constructor(public snackBar: MdSnackBar, private route: ActivatedRoute, public db: AngularFireDatabase) {
    this.database = db;
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.userName = params['userName'].toLowerCase();;
      this.observableData = this.database.object('/' + this.userName, {});
      this.observableData.subscribe(dataFromDb => {
        if (dataFromDb instanceof Array)  {
          this.data = dataFromDb;
        } else {
          console.log('DB is empty');
        }
      });
    });
  }

  update() {
    this.observableData.set(this.data);
  }

  openSnackBar() {
    this.snackBar.open('Alright... Remember to keep updating the table everyday!', 'Dismiss', {
      duration: 5000,
    });
  }

}
