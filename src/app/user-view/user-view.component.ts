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

  database: AngularFireDatabase;
  userName: string;
  mondayScore = 0;
  tuesdayScore = 0;
  wednesdayScore = 0;
  thursdayScore = 0;
  fridayScore = 0;
  saturdayScore = 0;
  sundayScore = 0;
  items: FirebaseObjectObservable<any[]>;

  constructor(private route: ActivatedRoute, public db: AngularFireDatabase) {
    this.database = db;
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.userName = params['userName'];
      this.items = this.database.object('/' + this.userName, {});
    });
  }

  send() {
    const data = {
      monday: this.mondayScore,
      tuesday: this.tuesdayScore,
      wednesday: this.wednesdayScore,
      thursday: this.thursdayScore,
      friday: this.fridayScore,
      saturday: this.saturdayScore,
      sunday: this.sundayScore
    };

    this.items.set(data);
}

}
