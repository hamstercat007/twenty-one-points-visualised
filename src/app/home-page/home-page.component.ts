import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  userName: string;
  database: AngularFireDatabase;
  observableData: FirebaseObjectObservable<any[]>;

  topFiveScores = [];

  constructor(public snackBar: MdSnackBar, private router: Router, public db: AngularFireDatabase) {
    this.database = db;
  }

  ngOnInit() {
    this.observableData = this.database.object('/', {});
    this.observableData.subscribe(dataFromDb => {
      const sortedData = [];
      Object.keys(dataFromDb).forEach(function (key) {
        const data = dataFromDb[key];
        let weeklyCount = 0;

        data.forEach(function (element) {
          const dayCount = +element.firstRule + +element.secondRule + +element.thirdRule;
          weeklyCount = weeklyCount + dayCount;
        });

        sortedData.push([key, weeklyCount]);
      });

      sortedData.sort(function (a, b) {
        return b[1] - a[1];
      });

      this.topFiveScores = sortedData.slice(0, 5);
    });
  }

  openSnackBar() {
    this.snackBar.open('Enter your name and you are ready to rumbleeeee!', 'Dismiss', {
      duration: 5000,
    });
  }

  public send(userName: string): void {
    this.router.navigate(['/user', userName]);
  }
}
