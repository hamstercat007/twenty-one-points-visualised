import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})

export class UserViewComponent implements OnInit {
  data = [
    {id: 0, name: 'Mon', firstRule: false, secondRule: false, thirdRule: false},
    {id: 1, name: 'Tues', firstRule: false, secondRule: false, thirdRule: false},
    {id: 2, name: 'Wed', firstRule: false, secondRule: false, thirdRule: false},
    {id: 3, name: 'Thur', firstRule: false, secondRule: false, thirdRule: false},
    {id: 4, name: 'Fri', firstRule: false, secondRule: false, thirdRule: false},
    {id: 5, name: 'Sat', firstRule: false, secondRule: false, thirdRule: false},
    {id: 6, name: 'Sun', firstRule: false, secondRule: false, thirdRule: false}
  ];

  userName: string;
  database: AngularFireDatabase;
  observableData: FirebaseObjectObservable<any[]>;

  constructor(private route: ActivatedRoute, public db: AngularFireDatabase) {
    this.database = db;
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.userName = params['userName'];
      this.observableData = this.database.object('/' + this.userName, {});
    });
  }

  update() {
    this.observableData.set(this.data);
  }

}
